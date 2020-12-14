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
  Status: any = false;  
  id: any;
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
        this.spinner.show();
        this.id = data.id;
        this.api.getsubscription(data.id).subscribe(resp => {
          this.Name=resp['data'][0].Name;
          this.Amount=resp['data'][0].Amount;
          this.Description=resp['data'][0].Description;
          if(resp['data'][0].Status==1){
            this.Status=true;
          }else{
            this.Status=false;
          }
          this.spinner.hide();       
        });
      }
    });
  }  
 
  
  create() {
    const status= (this.Status) ? 1: 0;
    this.api.addsubscription(this.Name,this.Amount,this.Description, status ).subscribe(resp => {

      this.api.alerts('Success', 'New Business Created', 'success');
      this.navCtrl.back();
    }, err => {
        console.log(err);
    });
    
  }
  update() {
    const status= (this.Status) ? 1: 0;
    this.api.updatesubscription( this.id, this.Name,this.Amount,this.Description, status ).subscribe(resp => {

      this.api.alerts('Success', 'Business Updated', 'success');
      this.navCtrl.back();
    }, err => {
        console.log(err);
    });
   
  }
  back(){
    this.navCtrl.back();
  }
}
