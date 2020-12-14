import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import {FormGroup,FormControl,Validator, Validators} from '@angular/forms';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit { 
  submitted = false;
  Email='';
  form = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email])
  })
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) {
   
  }
  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  } 

  submit(){
    this.submitted = true;
      if(this.form.invalid)
      {
          return false;
      }
      var formdata={
        "Email":this.Email
    }
    this.api.EmailCheck(formdata).subscribe(res => {
        if(res['result'].status==1){         
          this.api.alerts('Success', res['result'].message, 'success');  
          // this.router.navigate(['auth/reset'], navData); 
        }else if(res['result'].status==0){
          this.api.alerts('Error', res['result'].message, 'error');  
        }
        
    }, err => {
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
