import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
@Component({
  selector: 'app-admindetail',
  templateUrl: './admindetail.component.html',
  styleUrls: [
    './admindetail.component.scss'
  ],
})
export class AdmindetailComponent implements OnInit {
  adminhistorydata= [];
  id:any;
  public  date_format = 'd MMM yyyy H:mm';
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
        this.GetAdminHistoryList(data.id);
      }
    });

  }

  ngOnInit() { 
   
  }
  GetAdminHistoryList(id){
    this.spinner.show();
      this.api.GetAdminHistoryList(id).subscribe(res => {
        this.spinner.hide();
        this.adminhistorydata=res['result'].data;
        this.dtOptions = {
          pageLength: 10,
          lengthChange:false,
          processing: true,
          searching:true,
          info:false,
          
        };
    }, err => {
      this.spinner.hide();
    });  
  }  
  back(){
    this.navCtrl.back();
  } 
  
}
