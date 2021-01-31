import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: [
    './payment.component.scss'
  ],
})
export class PaymentComponent implements OnInit {
  payments:any;
  paymentdata= [];
  public  date_format = 'd MMM yyyy';
  dtOptions: DataTables.Settings = {};
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {   
    this.getpaymentData();
  }

  ngOnInit() {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange:false,
      processing: true,
      searching:true,
      info:false,
      
    };
  }
  getpaymentData(){
    this.spinner.show();
      this.api.getpaymentData().subscribe(res => {
        this.spinner.hide();
        this.paymentdata=res['result'].data;
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
  export(){
  var exportdata=[];
  this.paymentdata.forEach(obj => { 
      var location= obj.Address1+" "+obj.Address2+" "+obj.Country;    
      var ele={
        "Business Name":obj.Name,
        "Subscription type":obj.SubscriptionType,
        "Number of Users":obj.UserNumber,
        "Frequency":obj.Frequency,
        "Amount":"$"+obj.Totalamount,
        "OrderId":obj.OrderId,
        "Location":location.replace(",", " "),
        "Subscription Date":obj.SubscriptionDate,
        "Next Payment Date":obj.NextPaymentDate,
        "Payment Status":obj.AccountStatus,       
        "Account Status":(obj.Status==1)? "Active":"Non Active"
      }
      exportdata.push(ele);
    });
    var filename="Subscription Payments";
    let csvData = this.ConvertToCSV(exportdata, ['Business Name','Subscription type','Number of Users','Frequency','Amount','OrderId','Location','Subscription Date','Next Payment Date','Payment Status','Account Status']);
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
