import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ApisService } from '../services/apis.service';
@Component({
  selector: 'add-subscription',
  templateUrl: './addsubscription.component.html',
  styleUrls: ['./addsubscription.component.css']
})
export class AddsubscriptionComponent implements OnInit {
  new: boolean;
  Name: any = '';
  Amount: any = '';
  Description: any = '';
  Numbermin=0;
  Numbermax=0;
  Status: any = false;  
  id: any;
  childdata:any;
  constructor(
    private route: ActivatedRoute,
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private navCtrl: Location,
  ) { }

  ngOnInit() {  
   
    this.route.queryParams.subscribe(data => {
      this.new = data.register === 'true' ? true : false;
      if (!this.new && data.id) {
        this.id = data.id;
        this.getsubscription(data.id);              
      }
    });

  }  
  getsubscription(id){
    this.spinner.show();    
    this.api.getsubscription(id).subscribe(resp => {
      this.spinner.hide(); 
      if(resp['result'].status==1){
        this.Name=resp['result'].data.Name;
        this.Amount=resp['result'].data.Amount;
        this.Description=resp['result'].data.Description;
        this.Numbermin=resp['result'].data.Numbermin;
        this.Numbermax=resp['result'].data.Numbermax;
        if(resp['result'].data.Status==1){
          this.Status=true;
        }else{
          this.Status=false;
        }
       
      }   
    }); 
  } 
  create() {
    const status= (this.Status) ? 1: 0;
    const formdata = {
        Name: this.Name,
        Amount: this.Amount,
        Description: this.Description,
        Status: status,
        Numbermin:this.Numbermin,
        Numbermax:this.Numbermax,

      }   
    this.api.addsubscription(formdata).subscribe(resp => {
      if(resp['result'].status==1){
        this.api.alerts('Success', resp['result'].message, 'success');   
      }else if(resp['result'].status==0){
        this.api.alerts('Error', resp['result'].message, 'error');
      }   
      this.navCtrl.back();
    }, err => {
        console.log(err);
    });
    
  }
  update() {
    const status= (this.Status) ? 1: 0;
    const formdata = {
      Id:this.id,
      Name: this.Name,
      Amount: this.Amount,
      Description: this.Description,
      Status: status,
      Numbermin:this.Numbermin,
      Numbermax:this.Numbermax,
    }   
    this.api.updatesubscription(formdata).subscribe(resp => {   
      this.spinner.hide();
        if(resp['result'].status==1){
          this.api.alerts('Success', resp['result'].message, 'success');   
        }else if(resp['result'].status==0){
          this.api.alerts('Error', resp['result'].message, 'error');
        }   
      this.navCtrl.back();
    }, err => {
        console.log(err);
    });
   
  }
  back(){
    this.navCtrl.back();
  }
}
