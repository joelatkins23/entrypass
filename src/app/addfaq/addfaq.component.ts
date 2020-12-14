import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ApisService } from '../services/apis.service';
@Component({
  selector: 'addfaq',
  templateUrl: './addfaq.component.html',
  styleUrls: ['./addfaq.component.css']
})
export class AddfaqComponent implements OnInit {
  new: boolean;
  Question: any = '';
  Answer: any = '';
  Type: any = 'all';
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
        this.api.getfaq(data.id).subscribe(resp => {
          console.log(resp);
          this.Question=resp['data'][0].Question;
          this.Answer=resp['data'][0].Answer;
          this.Type=resp['data'][0].Type;
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
    this.api.addfaqs(this.Question,this.Answer,this.Type, status ).subscribe(resp => {

      this.api.alerts('Success', 'New Business Created', 'success');
      this.navCtrl.back();
    }, err => {
        console.log(err);
    });
    
  }
  update() {
    const status= (this.Status) ? 1: 0;
    this.api.updatefaqs( this.id, this.Question,this.Answer,this.Type, status ).subscribe(resp => {

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
