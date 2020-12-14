import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  subscriptiondata:any[] = []; 
  constructor(
    private api: ApisService,
    private router: Router
  ) {
   
  }

  ngOnInit() {
    this.getsubscriptionslist();
  }
  getsubscriptionslist() {
    this.api.getsubscriptionslist().subscribe(resp => {
          this.subscriptiondata=resp['data'];
      }, err => {
          console.log(err);
      });
  }
  payment(item){ 
    if(localStorage.getItem('Users') && localStorage.getItem('loggedin')){
       localStorage.setItem('payplan',JSON.stringify(item));
      this.router.navigate(['auth/payment']);
    }else{
      this.router.navigate(['auth/registration']);
    }
  }
}
