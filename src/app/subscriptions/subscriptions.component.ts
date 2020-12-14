import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: [
    './subscriptions.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SubscriptionsComponent implements OnInit {
  
  dummy = Array(10);
  dtOptions: DataTables.Settings = {};
  alldata:any[] = []; 
  constructor(
    private api: ApisService,
    private router: Router
  ) {    
    this.getsubscriptionslist();
  }

  ngOnInit() {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange:false,
      processing: true,
      searching:false,
      info:false,
      
    };
  }
  getsubscriptionslist() {
    this.api.getsubscriptionsalllist().subscribe(resp => {
          this.alldata=resp['data'];
      }, err => {
          console.log(err);
      });
  }
  subscription_remove(id){
    console.log(id);
    this.api.subscription_remove(id).subscribe(resp => {
      this.alldata=resp['data'];
  }, err => {
      console.log(err);
  });
  }
  createsubscription(){
    const navData: NavigationExtras = {
      queryParams: {
        register: true
      }
    };
    this.router.navigate(['addsubscription'], navData);
  }
  editsubscription(id){  
      const navData: NavigationExtras = {
        queryParams: {
          id: id,
          register: false
        }
      };
      this.router.navigate(['addsubscription'], navData);
  }
  
}
