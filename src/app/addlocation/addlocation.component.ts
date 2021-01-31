import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
  Numberuser:any;
  error=false;
  encryptSecretKey="12343455";
  Truncateemaillist=[];
  totalconcatemail=[];
  options: Options;
  constructor(
    private api: ApisService,
    private route: ActivatedRoute,
    private navCtrl: Location,
    private formbuilder:FormBuilder,
    private spinner: NgxSpinnerService,
  ) {  
   
    var user = localStorage.getItem('Users');
    this.Numberuser=JSON.parse(user).UserNumber;
    this.BusinessId=JSON.parse(user).Id;
       
    this.route.queryParams.subscribe(data => {
      this.new = data.register === 'true' ? true : false;
      if (data && data.id) {
        this.id = data.id;
        this.getlocation(data.id); 
        var formdata={
          BusinessId:JSON.parse(user).Id,
          LocationId:data.id
        }    
        this.Truncateemail(formdata);
      }else{       
        this.Truncateemail1(JSON.parse(user).Id);
      }
    });
    this.api.getuserlist().subscribe(res => {      
        this.persionemail=res['result'].data;        
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
    address1:new FormControl('',[Validators.required]),
    address2:new FormControl('',[Validators.required]),
    measurestatus:new FormControl('',[Validators.required]),
  })
  // when edit
  Truncateemail(formdata){
    this.api.GetDistinctemail(formdata).subscribe(res => {
      var ele=[];  
      res['result'].data.forEach(function (value) {
        ele.push(value['Email']);
      });    
      this.Truncateemaillist=ele;
      this.totalconcatemail=ele;
    }, err => {
      console.log(err);
    });  
  }
  // when register
  Truncateemail1(id){
    this.api.GetDistinctemail1(id).subscribe(res => {
      var ele=[];  
      res['result'].data.forEach(function (value) {
        ele.push(value['Email']);
      });    
      this.Truncateemaillist=ele;
      this.totalconcatemail=ele;
    }, err => {
      console.log(err);
    });  
  }
  changeMeasurestatus(e){
    this.Measurestatus=e;
    this.Measuresunit='';
  }
  oncheck(itemm, i){
    var ele=[];  
    if(itemm){
      var username=this.persionemail.find(x => x.Email == itemm.Email);
      if(username){
        if(this.childdata.filter(y => y.Email == itemm.Email).length>1){
          this.api.alerts('Error', "The email entered is already registered for this location.", 'error');
          this.childdata[i].Name="";
          this.childdata[i].Email="";
        }else{
          this.childdata[i].Name=username.Name;          
        }
        
      }else{      
        this.api.alerts('Error', "The email entered does not exist", 'error');
        this.childdata[i].Name="";
        this.childdata[i].Email="";
      }
    }
    this.childdata.forEach(function (value) {
      if(value['Email']){
        ele.push(value['Email']);
      }      
    }); 
    var totalconcatemail=this.totalconcatemail;
    var totalarr=totalconcatemail.concat(ele);   
    var returnarr =totalarr.filter((item,index)=>{
        return (totalarr.indexOf(item) == index)
    }) 
    if(returnarr.length>this.Numberuser){     
       this.error = true;
    }else{
      this.error = false;
    }
    
  } 
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
    if(this.childdata.length>=this.Numberuser){   
      this.api.alerts('Error', "Email can't register no longer", 'error');
    }else{
      var data={
        Id:0,
        Status:"",
        Name:"",
        Email:""
      }
      this.childdata.push(data);
    }
    
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
    this.oncheck("","")
  } 
  submit()
  {
    this.submited = true;
    if(this.form.invalid)
    {
        return;
    }
     var childata=this.childdata.filter(x => x.Email);
    
      var formdata={
        BusinessId:this.BusinessId,
        Address1:this.Address1,
        Address2:this.Address2,
        Measurestatus:this.Measurestatus,
        Measuresunit:this.Measuresunit,
        Childata:JSON.stringify(childata)
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
          Childata:JSON.stringify(childata)
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
  // encryptData(data) {

  //   try {
  //     return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // decryptData(data) {

  //   try {
  //     const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
  //     if (bytes.toString()) {
  //       return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //     }
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  back(){
      this.navCtrl.back();   
  }
 }
