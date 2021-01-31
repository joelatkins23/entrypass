import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [
    './settings.component.scss'
  ],
})
export class SettingsComponent implements OnInit {
  Email:"";
  Host:"";
  Port:"";
  Password:"";
  Publisher_name:"";
  Publisher_email:"";
  Publisher_password:"";
  submited1 = false;
  submited = false;
  Businessdays:number;
  Healthdays:number;
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
  form1 = this.formbuilder.group({
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',[Validators.required]),
    host:new FormControl('',[Validators.required]),
    port:new FormControl('',[Validators.required]),
  })
  form = this.formbuilder.group({
    publisher_name:new FormControl('',[Validators.required]),
    publisher_password:new FormControl('',[Validators.required]),
    publisher_email:new FormControl('',[Validators.email,Validators.required]),
  })
  ngOnInit() {
    this.getConfig(); 
  }
  getConfig(){
    this.spinner.show();
      this.api.getConfig().subscribe(res => {
        this.spinner.hide();
        var Smtppassword =res['result'].data.filter((element) => element.Item == 'Smtppassword');
        var Smtpemail =res['result'].data.filter((element) => element.Item == 'Smtpemail');
        var Smtphost =res['result'].data.filter((element) => element.Item == 'Smtphost');
        var Smtpport =res['result'].data.filter((element) => element.Item == 'Smtpport');
        var Pulgnplayname =res['result'].data.filter((element) => element.Item == 'Pulgnplayname');
        var Pulgnplayemail =res['result'].data.filter((element) => element.Item == 'Pulgnplayemail');
        var Pulgnplaypassword =res['result'].data.filter((element) => element.Item == 'Pulgnplaypassword');
        var Businessdays =res['result'].data.filter((element) => element.Item == 'Businessdays');
        var Healthdays =res['result'].data.filter((element) => element.Item == 'Healthdays');
        this.Password=(Smtppassword) ? Smtppassword[0].Content :'';
        this.Email=(Smtpemail) ? Smtpemail[0].Content :'';
        this.Host=(Smtphost) ? Smtphost[0].Content :'';
        this.Port=(Smtpport) ? Smtpport[0].Content :'';
        this.Publisher_name=(Pulgnplayname) ? Pulgnplayname[0].Content :'';
        this.Publisher_email=(Pulgnplayemail) ? Pulgnplayemail[0].Content :'';
        this.Publisher_password=(Pulgnplaypassword) ? Pulgnplaypassword[0].Content :'';
        this.Businessdays=(Businessdays) ? Businessdays[0].Content :'';
        this.Healthdays=(Healthdays) ? Healthdays[0].Content :'';
    }, err => {
      this.spinner.hide();
    });  
  }
  smtpsubmit()
    {
     
        this.submited1 = true;
        if(this.form1.invalid)
        {
            return;
        }
        var smtpformdata={
          Item:"Smtppassword",
          Content:this.Password
        }
        var smtpformdata1={
          Item:"Smtpemail",
          Content:this.Email
        }
        var smtpformdata2={
          Item:"Smtphost",
          Content:this.Host
        }
        var smtpformdata3={
          Item:"Smtpport",
          Content:this.Port
        }
        this.api.ConfigAdd(smtpformdata).subscribe(res => {
            console.log(res['result'].status);            
        }, err => {
          this.spinner.hide();
        });
        this.api.ConfigAdd(smtpformdata1).subscribe(res => {
          console.log(res['result'].status);
        }, err => {
          this.spinner.hide();
        }); 
        this.api.ConfigAdd(smtpformdata2).subscribe(res => {
            console.log(res['result'].status);            
        }, err => {
          this.spinner.hide();
        });
        this.spinner.show();
        this.api.ConfigAdd(smtpformdata3).subscribe(res => {
          console.log(res['result'].status);
          this.spinner.hide();
          this.api.alerts('Success', 'Smtp config Updated', 'success');            
      }, err => {
        this.spinner.hide();
      });       
    }
    plugsubmit()
    {
     
        this.submited = true;
        if(this.form.invalid)
        {
            return;
        }
        var plugformdata={
          Item:"Pulgnplayname",
          Content:this.Publisher_name
        }
        var plugformdat1={
          Item:"Pulgnplayemail",
          Content:this.Publisher_email
        }
        var plugformdat2={
          Item:"Pulgnplaypassword",
          Content:this.Publisher_password
        }
        this.spinner.show();
          this.api.ConfigAdd(plugformdata).subscribe(res => {
            if(res['result'].status==1){
              this.api.ConfigAdd(plugformdat1).subscribe(res => {
                  this.spinner.hide();
                  this.api.alerts('Success', 'Plug and Play config Updated', 'success');
              }, err => {
                this.spinner.hide();
              });  
            }
            
        }, err => {
          this.spinner.hide();
        }); 
        this.api.ConfigAdd(plugformdat2).subscribe(res => {
            console.log(res);
        }, err => {
          console.log(err);
        });        
    }
    transcationdayssubmit(){
      var businessformdata={
        Item:"Businessdays",
        Content:this.Businessdays
      }
      var healthformdat={
        Item:"Healthdays",
        Content:this.Healthdays
      }
      this.api.ConfigAdd(businessformdata).subscribe(res => {
          console.log(res['result'].status);            
      }, err => {
        this.spinner.hide();
      });
      this.api.ConfigAdd(healthformdat).subscribe(res => {
        console.log(res['result'].status);
        this.api.alerts('Success', 'Transactions Historical Days Updated', 'success');
      }, err => {
        this.spinner.hide();
      })
    }
}
