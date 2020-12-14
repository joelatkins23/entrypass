import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from '@angular/forms';
import { Options } from 'select2';
@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: [ './addlocation.component.scss' ]
})
export class AddlocationComponent implements OnInit {
  name="";
  new: boolean;
  id: any;
  BusinessId:number;
  childdata:any;
  Address1:string;
  Address2:string;
  Measurestatus="";
  Measuresunit="";
  submited=false;  
  persionemail=[];
  options: Options;
  constructor(
    private api: ApisService,
    private route: ActivatedRoute,
    private navCtrl: Location,
    private client:HttpClient,
    private formbuilder:FormBuilder,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {  
    this.api.getuserlist().subscribe(res => {
      var alldata=[];
        for(let item in res['result'].data)  {
          var element={
            id:res['result'].data[item].Email,
            text:res['result'].data[item].Email
          }
          alldata.push(element);
        }
        this.persionemail=alldata;        
    });
    var user = localStorage.getItem('Users');
    this.BusinessId=JSON.parse(user).Id;
    this.route.queryParams.subscribe(data => {
      this.new = data.register === 'true' ? true : false;
      if (data && data.id) {
        this.id = data.id;
        this.getlocation(data.id);        
      }
    });
  }

  ngOnInit() {  
        this.childdata =[
          {
            Id:0,
            Status:"",
            Name:"",
            Email:""          
          }]
     
  }  
  form = this.formbuilder.group({
    email:new FormControl('',[Validators.email,Validators.required])
  })
  getlocation(id){
    this.spinner.show();
    this.api.GetLocation(id).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.Address1=res['result'].data.Address1;
          this.Address2=res['result'].data.Address2;
          this.Measurestatus=res['result'].data.Measurestatus;
          this.Measuresunit=res['result'].data.Measuresunit;
          this.childdata=res['result'].data.childdata;
        }
              
    }, err => {
      this.spinner.hide();
    });   
  }
  onadd(){
    var data={
      Id:0,
      Status:"",
      Name:"",
      Email:""
    }
    this.childdata.push(data);
  }
  ondelete(item, id,i){
    if(id>0){
      this.spinner.show();
        this.api.DeleteSubLocation(id).subscribe(res => {
            this.spinner.hide();
            if(res['result'].status==1){
              this.api.alerts('Success', res['result'].message, 'success');   
              this.getlocation(this.id);         
            }else if(res['result'].status==0){
              this.api.alerts('Error', res['result'].message, 'error');
            }                  
        }, err => {
          this.spinner.hide();
        });
    }else{
      this.childdata.splice(i,1);
    }
  } 
  submit()
  {
   
      // this.submited = true;
      // if(this.form.invalid)
      // {
      //     return;
      // }
      var formdata={
        BusinessId:this.BusinessId,
        Address1:this.Address1,
        Address2:this.Address2,
        Measurestatus:this.Measurestatus,
        Measuresunit:this.Measuresunit,
        Childata:JSON.stringify(this.childdata)
      }
      if(this.new){
        this.spinner.show();
        this.api.AddLocation(formdata).subscribe(res => {
            this.spinner.hide();
            if(res['result'].status==1){
              this.api.alerts('Success', res['result'].message, 'success');                
              this.navCtrl.back();
            }else if(res['result'].status==0){
              this.api.alerts('Error', res['result'].message, 'error');
            }
                  
        }, err => {
          this.spinner.hide();
        });
      }else{
        var formdata1={
          Id:this.id,
          BusinessId:this.BusinessId,
          Address1:this.Address1,
          Address2:this.Address2,
          Measurestatus:this.Measurestatus,
          Measuresunit:this.Measuresunit,
          Childata:JSON.stringify(this.childdata)
        }
        this.spinner.show();
        this.api.UpdateLocation(formdata1).subscribe(res => {
            this.spinner.hide();
            if(res['result'].status==1){
              this.api.alerts('Success', res['result'].message, 'success');                
              this.navCtrl.back();
            }else if(res['result'].status==0){
              this.api.alerts('Error', res['result'].message, 'error');
            }
                  
        }, err => {
          this.spinner.hide();
        });     
      }
  }
  back(){
      this.navCtrl.back();   
  }
 }
