import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit { 
  countries=[];
  Cardname="";
  CardNumber="";
  MM="";
  YY="";
  Ccv="";
  Country="";
  Address1="";
  Address2="";
  Amount:any;
  subscriptionType:any;
  Description:any;
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private client:HttpClient,
  ) {
    if(!localStorage.getItem('Users') && !localStorage.getItem('loggedin')){      
      this.router.navigate(['auth/registration']);
    }else{
      if(!localStorage.getItem('payplan')){
        this.router.navigate(['auth/subscription']);
      }else{
        var payplan = JSON.parse(localStorage.getItem('payplan'));         
        this.Amount=payplan.Amount;
        this.subscriptionType=payplan.Name;
        this.Description=payplan.Description;        
      }
    }
    console.log(this.api.prepaid);
  }
  submited = false;
  paymentform = new FormGroup({
      Cardname:new FormControl('',[Validators.required]),
      CardNumber:new FormControl('',[Validators.required]),
      MM:new FormControl('',[Validators.required]),
      YY:new FormControl('',[Validators.required]),
      Ccv:new FormControl('',[Validators.required]),
      Country:new FormControl('',[Validators.required]),
      Address1:new FormControl('',[Validators.required]),
  })
  ngOnInit() {
    this.client.get('https://restcountries.eu/rest/v2/all').subscribe(data=>{         
      for(let item in data)  {
          this.countries.push(data[item]);
          }
          this.Country = "Barbados"
      },error=>{
       
          console.log(error)
      })
  } 
  submit(){
    this.submited = true;
      if(this.paymentform.invalid)
      {
          return;
      }
    var UserId=JSON.parse(localStorage.getItem('Users')).Id;
    var Name=JSON.parse(localStorage.getItem('Users')).Name;
    var formdata={
      UserId:UserId,
      Name:Name,
      SubscriptionType:this.subscriptionType,
      Amount:this.Amount,
      Cardname:this.Cardname,
      CardNumber:this.CardNumber,
      ExpiryMonth:this.MM,
      ExpiryYear:this.YY,
      Ccv:this.Ccv,
      Country:this.Country,
      Address1:this.Address1,
      Address2:this.Address2,
    }
    this.spinner.show();
    this.api.Payment(formdata).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.api.alerts('Success', res['result'].meassage, 'success');
            window.location.href = './location';
        }else{
          this.api.alerts('Error', res['result'].meassage, 'error'); 
        }
    }, err => {
        this.spinner.hide();
        console.log(err);
    });
  }
  
}
