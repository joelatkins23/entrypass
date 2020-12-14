import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: [ './location.component.scss' ]
})
export class LocationComponent implements OnInit {
  name="";
  alldata:any;
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() { 
    this.getlocationslist(); 
  }
  getlocationslist(){

    this.spinner.show();
    var user = localStorage.getItem('Users');
    var userData=JSON.parse(user);
      this.api.GetLocationList(userData.Id).subscribe(res => {
        this.spinner.hide();
        this.alldata=res['result'].data;
    }, err => {
      this.spinner.hide();
    });  
  }
  createlocation(){
    const navData: NavigationExtras = {
      queryParams: {
        register: true
      }
    };
    this.router.navigate(['addlocation'], navData);
  }
  editlocation(id){  
        const navData: NavigationExtras = {
          queryParams: {
            id: id,
            register: false
          }
        };
        this.router.navigate(['addlocation'], navData);
  }
  deletelocation(id){
    this.spinner.show();
      this.api.DeleteLocation(id).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.api.alerts('Success', res['result'].message, 'success');                
        }else if(res['result'].status==0){
          this.api.alerts('Error', res['result'].message, 'error');
        }
        this.getlocationslist();
    }, err => {
      this.spinner.hide();
    });
  }
 
 
  submit(){
    console.log("submit")
  }
 }
