import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  email: any = '';
  Password: any = '';
  submited = false;
  loginform = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
})
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }
 
  login() {
    this.submited = true;
      if(this.loginform.invalid)
      {
          return;
      }
    
    var formdata={
      Email : this.email,
      Password:this.Password
    }
    this.spinner.show();
    this.api.login(formdata).subscribe(res => {
      this.spinner.hide();
      if(res['result'].status==1){
        localStorage.setItem("Users",JSON.stringify(res['result'].data)); 
        localStorage.setItem('loggedin',"true");
        this.success(res['result'].message);
        if (res['result'].data && res['result'].data.Role === 'admin') {         
          this.router.navigate(['']);
        }else if(res['result'].data && res['result'].data.Role=='business') {
            if(res['result'].data.CreatedBy=="admin"){
              this.router.navigate(['location']); 
            }else{
              if(res['result'].checkstaus){
                this.router.navigate(['location']);
              }else{
                window.location.href = '/auth/subscription';
              }              
            }
        }else if(res['result'].data && res['result'].data.Role=='health') {                   
          this.router.navigate(['health_transaction']);
        }        
      }else{        
        this.error(res['result'].message);
      }          
  }, err => {
    this.spinner.hide();
    this.error("User name and password entered is incorrect!");
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
