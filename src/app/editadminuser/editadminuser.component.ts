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
  selector: 'app-editadminuser',
  templateUrl: './editadminuser.component.html',
  styleUrls: ['./editadminuser.component.scss']
})
export class EditadminuserComponent implements OnInit {
  id: any;
  countries = [];
  Country = ""
  DefaultValue = "";
  Name = "";
  UserName = "";
  Birthday = "";
  Phone = ""; 
  Address1 = "";
  Address2 = "";
  Region = "";
  Email = "";
  CreatedBy="";
  Role="";
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
      this.api.getadminUser(id).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.Country = res['result'].data.Country;
          this.DefaultValue = res['result'].data.DefaultValue;
          this.Name = res['result'].data.Name;
          this.UserName = res['result'].data.UserName;
          this.Birthday = (res['result'].data.Birthday) ? this.datePipe.transform(new Date(res['result'].data.Birthday),"yyyy-MM-dd") :"";
          this.Phone = res['result'].data.Phone;
          this.Address1 = res['result'].data.Address1;
          this.Address2 = res['result'].data.Address2;
          this.Region = res['result'].data.Region;
          this.Email = res['result'].data.Email;
          this.Status=res['result'].data.Status;
          this.CreatedBy=res['result'].data.CreatedBy;
          this.Role=res['result'].data.Role;
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
            DefaultValue : this.DefaultValue,
            Phone : this.Phone,
            Email :this.Email,
            Birthday : this.Birthday,
            Address1 : this.Address1,
            Address2 : this.Address2,  
            Region : this.Region,
            Country : this.Country,
            Status : this.Status,  
            Role:this.Role,
            CreatedBy:this.CreatedBy,            
        }
        this.spinner.show();
        this.api.UpdateAdminUser(formdata).subscribe(res => {
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
