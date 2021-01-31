import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {FormControl,FormGroup,Validators} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './contact.component.html',
  styleUrls: [
    './contact.component.scss'
  ]
})
export class ContactComponent implements OnInit {
  selecttype = "I am a Health Organization"
  submited = false;
  Email: string;
  Phone="";
  Message="";
  contactform = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
})
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {    
  }

  ngOnInit() {
    
  }
  select(item)
  {
      this.selecttype = item;
  }
  gotopayment(){
    this.router.navigate(['auth/payment']);
  }
  submit() {
    this.submited = true;
      if(this.contactform.invalid)
      {
          return;
      } 
      var formdata={
        Type:this.selecttype,
        Email:this.Email,
        Phone:this.Phone,
        Message:this.Message
      }
    
      this.api.SubmitContact(formdata).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){   
          this.api.alerts('Success', 'Email Sent Successful', 'success');  
          this.submited = false;
          this.Email="";
          this.Phone="";
          this.Message=""; 
             
          } else{    
            this.api.alerts('Error', "Email don't Send", 'error');    
        }          
    }, err => {
      this.spinner.hide();
      this.api.alerts('Error', "Email don't Send", 'error');    
    });   
  } 
}
