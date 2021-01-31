import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable'
@Component({
  selector: 'app-businesstransaction',
  templateUrl: './businesstransaction.component.html',
  styleUrls: [
    './businesstransaction.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class BusinesstransactionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  alltransaction= [];
  muticountries=[];
  country=[];
  head = [['ID','Business Name','User Name','Status','Unit','Value','Date','Country','Location','User (who scanned)']]
  public  date_format = 'd MMM yyyy';
  public  time_format = 'h.mm a';
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
      this.GetBusinessTransaction();
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
  GetBusinessTransaction(){
    var userdata = localStorage.getItem('Users');
    var user=JSON.parse(userdata);
    this.spinner.show();
      this.api.GetBusinessTransaction(user.Id).subscribe(res => {
        this.spinner.hide();
        this.alltransaction=res['result'].data;  
    }, err => {
      this.spinner.hide();
    });  
  }
  export() {
    var exportdata=[];
    this.alltransaction.forEach((obj, key) => {      
       var ele=[
         key+1,
         obj.Businessname,
         obj.Username,
         obj.CheckStatus,
         obj.Measuresunit,
         obj.MeasuresValue,
         obj.MeasuresDate,
         obj.BusinessCountry,
         obj.Address1+" "+obj.Address2,               
         obj.Scanedname,
       ]
       exportdata.push(ele);
    });
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Transaction', 90, 12);
    doc.setFontSize(9);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.head,
      body: exportdata,
      // theme: 'plain',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('Health Transaction.pdf');
  }  
}
