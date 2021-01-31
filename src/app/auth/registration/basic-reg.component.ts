import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {  DatePipe } from '@angular/common';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'src/app/custom-validators';
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
  BusinessRegister="";
  Gender = "";
  Birthday =this.datePipe.transform(new Date(),"yyyy-MM-dd");
  Phone = "";
  Address1 = "";
  Address2 = "";
  Region = "";
  Email = "";
  Password = "";
  ConfirmPassword="";
  submited = false;
  TermsOfUse:"";
  pass=false;
  cpass=false;
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private client:HttpClient,
    private formbuilder:FormBuilder,
    private datePipe:DatePipe
  ) {
   
  }

  ngOnInit() {
      this.getConfig();
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
      email:new FormControl(null,[Validators.email,Validators.required]),
      password:new FormControl(null,[Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
        Validators.minLength(6)
    
    ]),
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
  passwordhidden(){
    this.pass=!this.pass;
  }
  cpasswordhidden(){
    this.cpass=!this.cpass;
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
  getConfig(){
    this.spinner.show();
      this.api.getConfig().subscribe(res => {
        this.spinner.hide();
        var TermsOfUseData =res['result'].data.filter((element) => element.Item == 'Terms');
        this.TermsOfUse=(TermsOfUseData) ? TermsOfUseData[0].Content :'';
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
            Status:1,
            BusinessRegister:this.BusinessRegister
            
        }
        // console.log(formdata);
        this.spinner.show();
        this.api.signup(formdata).subscribe(res => {
            this.spinner.hide();
            if(res['result'].status==1){
                this.api.alerts('Success', res['result'].message, 'success');
                localStorage.setItem("Users",JSON.stringify(res['result'].data)); 
                localStorage.setItem('loggedin',"true");
                // this.router.navigate(['auth/subscription']);
                if(localStorage.getItem('payplan')){
                    window.location.href = './auth/payment';
                }else{
                    window.location.href = './auth/subscription';
                }
                
            }else{
                this.api.alerts('Error', res['result'].message, 'error');
            }
        }, err => {
            this.spinner.hide();
            console.log(err);
        });
       
    } 
    
}
