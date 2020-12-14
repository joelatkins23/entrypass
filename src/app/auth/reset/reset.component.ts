import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit { 
  submited = false;
  Password="";
  ConfirmPassword="";
  token: any;
  constructor(
    private api: ApisService,
    private router: Router,
    private route: ActivatedRoute,
    private formbuilder:FormBuilder
  ) {
    this.route.queryParams.subscribe(data => {
        if (data && data.token) {
          this.token = data.token;
        }
      });
  }
  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  } 
  form = this.formbuilder.group({
      pass:new FormControl('',[Validators.required]),
      confirm_pass:new FormControl('',[Validators.required])
  },{validator:this.mustmatch('pass','confirm_pass')})
 
  get f() { return this.form.controls; }
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
    submit()
    {
        this.submited = true;

        if(this.form.invalid)
        {
            return;
        }
        var formdata={
            "Token":this.token,
            "Password":this.Password
        }
        this.api.ChangePass(formdata).subscribe(res => {
            if(res['result']){
                this.router.navigate(['auth/login']);   
            }
            
        }, err => {
            console.log(err);
        });
       
    }
}
