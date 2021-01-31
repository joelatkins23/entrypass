import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
@Component({
  selector: 'app-healthdetail',
  templateUrl: './healthdetail.component.html',
  styleUrls: [
    './healthdetail.component.scss'
  ],
})
export class HealthdetailComponent implements OnInit {
  healths= [];
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
        this.GetBusinessHistoryList(data.id);
      }
    });

  }

  ngOnInit() {   
  }

  GetBusinessHistoryList(id){
    this.spinner.show();
      this.api.GetHealthHistoryList(id).subscribe(res => {
        this.spinner.hide();
        this.healths=res['result'].data;   
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
  getClass(item) {
    if (item === 'created' || item === 'accepted' || item === 'picked') {
      return 'btn btn-primary btn-round';
    } else if (item === 'delivered') {
      return 'btn btn-success btn-round';
    } else if (item === 'rejected' || item === 'cancel') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

 
}
