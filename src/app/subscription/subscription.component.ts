import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './subscription.component.html',
  styleUrls: [
    './subscription.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionComponent implements OnInit {
  alldata:any[] = []; 
  role='';
  constructor(
    private api: ApisService,
    private router: Router
  ) {
    if(localStorage.getItem('Users') && localStorage.getItem('loggedin')){
      this.role=JSON.parse(localStorage.getItem('Users')).Role;
    }

  }

  ngOnInit() {
    this.getsubscriptionslist();
  }
  getsubscriptionslist() {
    this.api.getsubscriptionslist().subscribe(resp => {
          this.alldata=resp['data'];
      }, err => {
          console.log(err);
      });
  }
  payment(item){ 
    localStorage.setItem('payplan',JSON.stringify(item));
    if(localStorage.getItem('Users') && localStorage.getItem('loggedin')){
        if(this.role=='business'){
          this.router.navigate(['auth/payment']);
        }      
    }else{
      this.router.navigate(['auth/registration']);
    }
  }  
}
