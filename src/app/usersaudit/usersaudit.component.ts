import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-usersaudit',
  templateUrl: './usersaudit.component.html',
  styleUrls: ['./usersaudit.component.css']
})
export class UsersauditComponent implements OnInit {
  users= [];
  id:any;
  public  date_format = 'd MMM yyyy h:mm';
  dtOptions: DataTables.Settings = {};
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private navCtrl: Location,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(data => {
      if (data && data.id) {
        this.id = data.id;
        this.GetUserHistoryList(data.id);
      }
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      lengthChange:false,
      processing: true,
      searching:true,
      info:false,      
    };  
   
  }
  GetUserHistoryList(id){
    this.spinner.show();
    this.api.GetUserHistoryList(id).subscribe(res => {
      this.spinner.hide();
      this.users=res['result'].data;      
  }, err => {
    this.spinner.hide();
  }); 
  }
 
  back(){
    this.navCtrl.back();
  }

  
}
