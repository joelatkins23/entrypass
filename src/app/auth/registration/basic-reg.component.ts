import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {

  countries = [];
  Country = ""
  DefaultValue = "";
  Name = "";
  UserName = "";
  Gender = "";
  Birthday = "";
  Phone = "";
  Address1 = "";
  Address2 = "";
  Region = "";
  Email = "";
  Password = "";
  ConfirmPassword="";
  submited = false;
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private client:HttpClient,
    private formbuilder:FormBuilder
  ) {
   
  }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.client.get('https://restcountries.eu/rest/v2/all').subscribe(data=>{         
      for(let item in data)  {
          this.countries.push(data[item]);
          }
          this.Country = "Barbados"
          this.DefaultValue = "1246";
      },error=>{
          console.log(error)
      })
  }
  form = this.formbuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
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
              // return if another validator has already found an error on the matchingControl
              return;
          }

          // set error on matchingControl if validation fails
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
     
        this.submited = true;
        if(this.form.invalid)
        {
            return;
        }
        var formdata={
                    
            Name : this.Name,
            UserName : this.UserName,
            Email : this.Email,
            Password : this.Password,
            Birthday : this.Birthday,
            DefaultValue :this.DefaultValue,
            Phone : this.Phone,          
            Country : this.Country,  
            Address1 : this.Address1,
            Address2 : this.Address2,
            Region : this.Region,
            Role:"business",
            Status:1
            
        }
        this.spinner.show();
        this.api.signup(formdata).subscribe(res => {
            this.spinner.hide();
            if(res['result'].status==1){
                this.success(res['result'].message);
                localStorage.setItem("Users",JSON.stringify(res['result'].data)); 
                localStorage.setItem('loggedin',"true");
                this.router.navigate(['auth/subscription']);
            }else{
                this.error(res['result'].message);
            }
        }, err => {
            this.spinner.hide();
            console.log(err);
        });
       
    } 
    error(message) {
        const toastOptions: ToastOptions = {
        title: this.api.translate('Error'),
        msg: message,
        showClose: true,
        timeout: 2000,
        theme: 'default',
        onAdd: (toast: ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function (toast: ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
        }
        };
        // Add see all possible types in one shot
        this.toastyService.error(toastOptions);
    }
    success(message) {
        const toastOptions: ToastOptions = {
        title: this.api.translate('Success'),
        msg: message,
        showClose: true,
        timeout: 2000,
        theme: 'default',
        onAdd: (toast: ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function (toast: ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
        }
        };
        // Add see all possible types in one shot
        this.toastyService.success(toastOptions);
    } 
}
