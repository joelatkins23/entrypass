import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: [
    './adminuser.component.scss'
  ],
})
export class AdminuserComponent implements OnInit {
  adminuserdata= [];
  public  date_format = 'd MMM yyyy';
  dtOptions: DataTables.Settings = {};
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
   

  }

  ngOnInit() {
    this.getadminList();
   
  }
  getadminList(){
    this.spinner.show();
      this.api.adminList().subscribe(res => {
        this.spinner.hide();
        this.adminuserdata=res['result'].data;
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
  createuser(){
   
    this.router.navigate(['addadminuser']);
  }
  edituser(id){  
        const navData: NavigationExtras = {
          queryParams: {
            id: id
          }
        };
        this.router.navigate(['editadminuser'], navData);
  }
  viewuser(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id,
      }
    };
    this.router.navigate(['admindetail'], navData);
  }


  
}
