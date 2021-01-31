import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  id: any;
  countries = [];
  Country = ""
  DefaultValue = "";
  Name = "";
  UserName = "";
  Gender = "";
  Birthday = "";
  Phone = "";
  TypeId = "";
  IdNumber = "";
  Address1 = "";
  Address2 = "";
  Region = "";
  Email = "";
  Status:any;
  submited = false;
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
      if (data && data.id) {
        this.id = data.id;
        this.getProfile(data.id);
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
  getProfile(id) {
    this.spinner.show();
      this.api.getUser(id).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.Country = res['result'].data.Country;
          this.DefaultValue = res['result'].data.DefaultValue;
          this.Name = res['result'].data.Name;
          this.UserName = res['result'].data.UserName;
          this.Gender = res['result'].data.Gender;
          this.Birthday = (res['result'].data.Birthday) ? this.datePipe.transform(new Date(res['result'].data.Birthday),"yyyy-MM-dd") :"";
          this.Phone = res['result'].data.Phone;
          this.TypeId = res['result'].data.TypeId;
          this.IdNumber = res['result'].data.IdNumber;
          this.Address1 = res['result'].data.Address1;
          this.Address2 = res['result'].data.Address2;
          this.Region = res['result'].data.Region;
          this.Email = res['result'].data.Email;
          this.Status=res['result'].data.Status;
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
        var formdata={    
            Id:this.id,                
            Name : this.Name,
            UserName : this.UserName,
            Email : this.Email,
            Gender : this.Gender,
            Birthday : this.Birthday,
            DefaultValue :this.DefaultValue,
            Phone : this.Phone,
            TypeId : this.TypeId,
            IdNumber : this.IdNumber,
            Country : this.Country,  
            Address1 : this.Address1,
            Address2 : this.Address2,
            Region : this.Region,
            Status : this.Status,            
        }
        this.spinner.show();
        this.api.UpdateAppUser(formdata).subscribe(res => {
          this.spinner.hide();
          if(res['result'].status==1){
            this.api.alerts('Success', res['result'].message, 'success');
            this.navCtrl.back();
          }
                
      }, err => {
        this.spinner.hide();
      });  
      
       
    }
 
  back(){
    this.navCtrl.back();
  }

  

}
