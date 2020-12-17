import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';
import {  DatePipe } from '@angular/common';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-businessprofile',
  templateUrl: './businessprofile.component.html',
  styleUrls: [
    './businessprofile.component.scss'
  ],
})
export class BusinessprofileComponent implements OnInit {  
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
  Password:string="";
  ConfirmPassword:string="";
  Id:any;
  PhoneExt:any;
  Status:any;
  Role:any;
  CreatedBy:any;      
  submited = false;
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private client:HttpClient,
    private formbuilder:FormBuilder,
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
        var UserData=JSON.parse(localStorage.getItem('Users'));
        this.Id=UserData.Id;
        this.Name=UserData.Name;
        this.UserName=UserData.UserName;
        this.Birthday=this.datePipe.transform(new Date(UserData.Birthday),"yyyy-MM-dd");
        this.DefaultValue=UserData.DefaultValue;
        this.Phone=UserData.Phone;
        this.Address1=UserData.Address1;
        this.Address2=UserData.Address2;
        this.Region=UserData.Region;
        this.Country=UserData.Country;
        this.Email=UserData.Email;
        this.PhoneExt=UserData.PhoneExt;
        this.Status=UserData.Status;
        this.Role=UserData.Role;
        this.CreatedBy=UserData.CreatedBy;   
        
  }


  form = this.formbuilder.group({
      password:new FormControl('',[Validators.required]),
      confirm_pass:new FormControl('',[Validators.required])
  },{validators:this.mustmatch('password','confirm_pass')})

mustmatch(controlName:string,matchingControlName:string)
{
    return (formGroup:FormGroup)=>
    {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

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
   
      // this.submited = true;
      // if(this.form.invalid)
      // {
      //     return;
      // }
      var formdataa={  
        Id:this.Id,  
        Name : this.Name,
        UserName : this.UserName,
        DefaultValue : this.DefaultValue,
        Phone : this.Phone,
        PhoneExt : this.PhoneExt,
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
      this.api.UpdateBusiness(formdataa).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.api.alerts('Success', res['result'].message, 'success');
          localStorage.setItem("Users",JSON.stringify(res['result'].data)); 
        }
              
    }, err => {
      this.spinner.hide();
    });  
     
  } 
  onchangepassword(){
     this.submited = true;
      if(this.form.invalid)
      {
          return;
      }
      var formdataa={  
        Id:this.Id,  
        Password : this.Password
    }
    this.spinner.show();
      this.api.ChangePasswordBusiness(formdataa).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.api.alerts('Success', res['result'].message, 'success');
          localStorage.setItem("Users",JSON.stringify(res['result'].data)); 
          this.Password="";
          this.ConfirmPassword="";
        } 
    }, err => {
      this.spinner.hide();
    });  
  }
 
}