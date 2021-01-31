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
  role="";
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
          this.subscriptiondata=resp['data'];
      }, err => {
          console.log(err);
      });
  }
  gotosubscription(){
    this.router.navigate(['auth/subscription']);
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
