import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: [
    './business.component.scss'
  ],
})
export class BusinessComponent implements OnInit {
  businesses= [];
  public  date_format = 'd MMM yyyy';
  dtOptions: DataTables.Settings = {};
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
   

  }

  ngOnInit() {
    this.getbusinesslist();
   
  }
  getbusinesslist(){
    this.spinner.show();
      this.api.BusinessList().subscribe(res => {
        this.spinner.hide();
        this.businesses=res['result'].data;
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
  createbusiness(){
    const navData: NavigationExtras = {
      queryParams: {
        register: true
      }
    };
    this.router.navigate(['addbusiness'], navData);
  }
  editbusiness(id){  
        const navData: NavigationExtras = {
          queryParams: {
            id: id,
            register: false
          }
        };
        this.router.navigate(['addbusiness'], navData);
  }
  viewbusiness(id){
    const navData: NavigationExtras = {
      queryParams: {
        id: id,
      }
    };
    this.router.navigate(['businessdetail'], navData);
  }

  export(){
    var exportdata=[];
    this.businesses.forEach(obj => {      
       var ele={
         "Business Name":obj.Name,
         "Contact Person":obj.UserName,
         "Email":obj.Email,
         "Date":obj.Birthday,
         "Phone":"+"+obj.DefaultValue+" "+obj.PhoneExt+"-"+obj.Phone,
         "Country":obj.Country,
         "Address1":obj.Address1,
         "Address2":obj.Address2,
         "Region":obj.Region,
         "Registed Date":obj.CreateAt,
         "Status":(obj.Status==1)?"Yes":"No"
       }
       exportdata.push(ele);
    });
    var filename="Business Registration";
    let csvData = this.ConvertToCSV(exportdata, ['Business Name','Contact Person','Email','Date','Phone','Country','Address1','Address2','Region','Registed Date','Status']);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

    if (isSafariBrowser) {  
        dwldLink.setAttribute("target", "_blank");
    }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
  }
  ConvertToCSV(objArray, headerList) {

      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let row = 'S.No,';
      for (let index in headerList) {
          row += headerList[index] + ',';
      }
      row = row.slice(0, -1);
      str += row + '\r\n';
      for (let i = 0; i < array.length; i++) {
          let line = (i+1)+'';
          for (let index in headerList) {
              let head = headerList[index];
              line += ',' + array[i][head];
        }
        str += line + '\r\n';
      }
     return str;
  }

  
}
