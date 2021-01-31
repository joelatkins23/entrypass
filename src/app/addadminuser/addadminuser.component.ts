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
  selector: 'addadminuser',
  templateUrl: './addadminuser.component.html',
  styleUrls: ['./addadminuser.component.css']
})
export class AddadminuserComponent implements OnInit {
  new: boolean;
  id: any;
  countries = [];
  Name = ""
  UserName = "";
  DefaultValue = "1246";
  Phone = "";
  PhoneExt = "";
  Email = "";
  Birthday = "";  
  Address1 = "";
  Address2 = "";
  Region = "";
  Country = "Barbados";
  Status = "";
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
  
  submit()
    {
     
        this.submited = true;
        if(this.form.invalid)
        {
            return;
        }
     
        var formdata={    
          Name : this.Name,
          UserName : this.UserName,
          Birthday:this.Birthday,
          Email : this.Email,
          DefaultValue :this.DefaultValue,
          phone:this.Phone,
          Country : this.Country,  
          Address1 : this.Address1,
          Address2 : this.Address2,
          Region : this.Region,
          Role:"admin"
      }
      this.spinner.show();
        this.api.adminsignup(formdata).subscribe(res => {
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
 
  back(){
    this.navCtrl.back();
  }

  
}
