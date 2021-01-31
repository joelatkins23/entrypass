import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {AbstractControl, FormControl,FormGroup,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit { 
  countries=[];
  Email="";
  Cardname="";
  CardNumber="";
  UserNumber:number;
  Frequency="";
  Totalamount=0;
  MM="";
  YY="";
  Ccv="";
  SubscriptionDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");  
  NextPaymentDate="";
  Country="";
  Address1="";
  Address2="";
  Amount:any;
  SubscriptionId:any;
  SubscriptionType:any;
  Description:any;
  childdata:[];
  Numbermin:0;
  Numbermax:0;
  paymentform:any;
  submited=false;
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private client:HttpClient,
    private datePipe: DatePipe
  ) {
    if(!localStorage.getItem('Users') && !localStorage.getItem('loggedin')){      
      this.router.navigate(['auth/registration']);
    }else{
      if(!localStorage.getItem('payplan')){
        this.router.navigate(['auth/subscription']);
      }else{
        this.getsubscriptionslist();
        this.Email=JSON.parse(localStorage.getItem('Users')).Email;
        var payplan = JSON.parse(localStorage.getItem('payplan'));  
        this.SubscriptionId=payplan.Id;       
        this.Amount=payplan.Amount;
        this.SubscriptionType=payplan.Name;
        this.Description=payplan.Description;   
        this.Numbermin=payplan.Numbermin;  
        this.Numbermax=payplan.Numbermax;        
         
      }
    }
    
  }
    
  ngOnInit() {    
    this.paymentform = new FormGroup({
        Cardname:new FormControl('',[Validators.required]),
        UserNumber:new FormControl('',[Validators.required, (control: AbstractControl)=>Validators.min(Number(this.Numbermin))(control), (control: AbstractControl)=>Validators.max(Number(this.Numbermax))(control)]),
        Frequency:new FormControl('',[Validators.required]),
        CardNumber:new FormControl('',[Validators.required]),
        MM:new FormControl('',[Validators.required]),
        YY:new FormControl('',[Validators.required]),
        Ccv:new FormControl('',[Validators.required]),
        Country:new FormControl('',[Validators.required]),
        Address1:new FormControl('',[Validators.required]),
    })   
    this.client.get('https://restcountries.eu/rest/v2/all').subscribe(data=>{         
      for(let item in data)  {
          this.countries.push(data[item]);
          }
          this.Country = "Barbados"
      },error=>{
       
          console.log(error)
      })
  } 
  getsubscriptionslist(){
    this.api.getsubscriptionslist().subscribe(resp => {
      this.childdata=resp['data'];
      }, err => {
          console.log(err);
      });
  }
 
  select(item){
    this.Numbermin=item.Numbermin;
    this.Numbermax=item.Numbermax;
    this.Amount=item.Amount;
    this.Description=item.Description;
    this.SubscriptionType=item.Name;
    this.SubscriptionId=item.Id;
    this.Total();
  } 
  Total(){
    var  dt = new Date();
    if(this.Frequency=="Monthly"){     
     this.NextPaymentDate=this.add_months(dt, 1);
     this.Totalamount=this.Amount*this.UserNumber;
    }else if(this.Frequency=="Annually"){
      this.NextPaymentDate=this.add_months(dt, 12);
      this.Totalamount=this.Amount*this.UserNumber*12;
    }
  }  
  add_months(dt, n) {
   return this.datePipe.transform(new Date(dt.setMonth(dt.getMonth() + n)),"yyyy-MM-dd");  
   }
   change_formatcreditNumber (str) {
    this.CardNumber= str.replace(/(\d{4})(\d)/, '$1-$2'); 
   }
  submit(){   
    
    if(this.paymentform.invalid)
    {
        return;
    }
    this.submited = true;
    var UserId=JSON.parse(localStorage.getItem('Users')).Id;    
    var Name=JSON.parse(localStorage.getItem('Users')).Name;
    var formdata={
      UserId:UserId,
      Name:Name,
      SubscriptionId:this.SubscriptionId,
      SubscriptionType:this.SubscriptionType,     
      Description:this.Description,  
      Email:this.Email,
      UserNumber:this.UserNumber,
      Frequency:this.Frequency,
      SubscriptionDate:this.SubscriptionDate,
      NextPaymentDate:this.NextPaymentDate,
      Totalamount:this.Totalamount,
      Cardname:this.Cardname,
      CardNumber:this.CardNumber.replace(/\-/gi, ''),
      ExpiryMonth:this.MM,
      ExpiryYear:this.YY,
      Ccv:this.Ccv,
      Country:this.Country,
      Address1:this.Address1,
      Address2:this.Address2,
    }
    // console.log(formdata);
    this.spinner.show();
    this.api.Payment(formdata).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.submited = false;
          this.api.alerts('Success', res['result'].meassage, 'success');
          localStorage.setItem("Users",JSON.stringify(res['result'].user));
            window.location.href = './location';
        }else{
          this.api.alerts('Error', res['result'].meassage, 'error'); 
          this.submited = false;
        }
    }, err => {
        this.spinner.hide();
        console.log(err);
    });
  }
  
}
