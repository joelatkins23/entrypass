import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'addbusiness',
  templateUrl: './addbusiness.component.html',
  styleUrls: ['./addbusiness.component.css']
})
export class AddbusinessComponent implements OnInit {
  new: boolean;
  id: any;
  countries = [];
  BusinessName = ""
  BusinessRegister="";
  ContactPerson = "";
  DefaultValue = "1246";
  Phone = "";
  PhoneExt = "";
  Email = "";
  Bsdate = this.datePipe.transform(new Date(),"yyyy-MM-dd");  
  Address1 = "";
  Address2 = "";
  Region = "";
  Country = "Barbados";
  Status = "";
  UserNumber=0;
  submited = false;
  Totalamount="";
  CreatedBy="";
  ExpriyDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
  public  date_format = 'yyyy-MM-DD';
  constructor(
    private api: ApisService,
    private route: ActivatedRoute,
    private navCtrl: Location,
    private client:HttpClient,
    private formbuilder:FormBuilder,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) { 
    this.route.queryParams.subscribe(data => {
      this.new = data.register === 'true' ? true : false;
      if (data && data.id) {
        this.id = data.id;
        this.getBusiness(data.id);
      }
    });
  }

  ngOnInit() {
    this.client.get('https://restcountries.eu/rest/v2/all').subscribe(data=>{         
      for(let item in data)  {
          this.countries.push(data[item]);
          }         
      },error=>{
          console.log(error)
      })
    
  }
  form = this.formbuilder.group({
    email:new FormControl('',[Validators.email,Validators.required])
  })
  getCountry()
  {
      for(let item in this.countries)
      {
          if(this.countries[item].callingCodes && this.countries[item].callingCodes[0] == this.DefaultValue)
          {
              return this.countries[item].flag;
          }
      }
  }
  getBusiness(id) {
    this.spinner.show();
      this.api.getBusiness(id).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.BusinessName = res['result'].data.Name;
          this.ContactPerson = res['result'].data.UserName;
          this.BusinessRegister = res['result'].data.BusinessRegister;
          this.DefaultValue = res['result'].data.DefaultValue;
          this.Phone = res['result'].data.Phone;
          this.PhoneExt = res['result'].data.PhoneExt;
          this.Email = res['result'].data.Email;
          this.Bsdate = this.datePipe.transform(new Date(res['result'].data.Birthday),"yyyy-MM-dd");        
          this.Address1 = res['result'].data.Address1;
          this.Address2 = res['result'].data.Address2;
          this.Region = res['result'].data.Region;
          this.Country = res['result'].data.Country;
          this.Status=res['result'].data.Status;
          this.UserNumber=res['result'].data.UserNumber;
          this.Totalamount=res['result'].data.Totalamount;
          this.ExpriyDate=this.datePipe.transform(new Date(res['result'].data.ExpriyDate),"yyyy-MM-dd");
          this.CreatedBy=res['result'].data.CreatedBy;
        }
              
    }, err => {
      this.spinner.hide();
    });   
  }  
  submit()
    {
     
        this.submited = true;
        if(this.form.invalid)
        {
            return;
        }
        if(this.new){
            var formdata={    
              Name : this.BusinessName,
              UserName : this.ContactPerson,
              DefaultValue : this.DefaultValue,
              Phone : this.Phone,
              PhoneExt : this.PhoneExt,
              Email :this.Email,
              Birthday : this.Bsdate,
              Address1 : this.Address1,
              Address2 : this.Address2,  
              Region : this.Region,
              Country : this.Country,
              Status : this.Status,  
              UserNumber:this.UserNumber,
              Totalamount:this.Totalamount,
              Role:'business',
              CreatedBy:'admin',
              ExpriyDate:this.ExpriyDate ,
              BusinessRegister:this.BusinessRegister
          }
          this.spinner.show();
            this.api.AddBusiness(formdata).subscribe(res => {
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
           
              var formdataa={  
                Id:this.id,  
                Name : this.BusinessName,
                UserName : this.ContactPerson,
                DefaultValue : this.DefaultValue,
                Phone : this.Phone,
                PhoneExt : this.PhoneExt,
                Email :this.Email,
                Birthday : this.Bsdate,
                Address1 : this.Address1,
                Address2 : this.Address2,  
                Region : this.Region,
                Country : this.Country,
                Status : this.Status, 
                UserNumber:this.UserNumber, 
                Totalamount:this.Totalamount,
                Role:'business',
                ExpriyDate:this.ExpriyDate,
                BusinessRegister:this.BusinessRegister
            }
            this.spinner.show();
              this.api.UpdateBusiness(formdataa).subscribe(res => {
                this.spinner.hide();
                if(res['result'].status==1){
                  this.api.alerts('Success', res['result'].message, 'success');
                  this.navCtrl.back();
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
