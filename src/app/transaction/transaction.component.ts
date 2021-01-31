import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: [
    './transaction.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TransactionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  alltransaction:any[] = [];
  alldata:any[] = [];
  muticountries:any[] = [];
  selectedcoutries:any[] = [];
  dropdownSettings: any = {};
  public  date_format = 'd MMM yyyy';
  public  time_format = 'h.mm a';

  head = [['ID','Visitor Name','User Name','Gender','Contact number','Type of ID','DOB','Business name','Location','Date','Time','Check Status','Measures Unit','Measures Value','User (who scanned)']]

  
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {
      this.GetHealthTransaction();
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
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
   };
  }
  GetHealthTransaction(){
    var userdata = localStorage.getItem('Users');
    var user=JSON.parse(userdata);
    
    this.spinner.show();
      this.api.GetAllHealthTransaction().subscribe(res => {
        this.spinner.hide();
        this.alltransaction=res['result'].data;  
        this.alldata=res['result'].data; 
        // this.muticountries=JSON.parse(user.Country);
        // this.selectedcoutries=JSON.parse(user.Country); 
    }, err => {
      this.spinner.hide();
    });  
    
  }
  async changecountry(event){
    var alldata=this.alldata;
    var searchdata=[];
    event.forEach(function (value) { 
      var ele =alldata.filter((element) => element.BusinessCountry == value.name);
      searchdata=searchdata.concat(ele);
    }); 
    this.alltransaction=searchdata;
    // console.log(searchdata);
  }
  export() {
    var exportdata=[];
    this.alltransaction.forEach((obj, key) => {      
       var ele=[
         key+1,
         obj.visitor_name,
         obj.Username,
         obj.Gender,
         "+"+obj.DefaultValue+" "+obj.Phone,
         obj.TypeId+ ":"+obj.IdNumber,
         this.datePipe.transform(new Date(obj.Birthday),"d MMM yyyy"),
         obj.Businessname,
         obj.BusinessCountry + " "+obj.Address1,
         this.datePipe.transform(new Date(obj.MeasuresDate),"d MMM yyyy"),
         this.datePipe.transform(new Date(obj.MeasuresDate),"h.mm a"),
         obj.CheckStatus,
         obj.Measuresunit,
         obj.MeasuresValue,
         obj.Scanedname,
       ]
       exportdata.push(ele);
    });
    var doc = new jsPDF('landscape');

    doc.setFontSize(18);
    doc.text('Transaction', 140, 12);
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
  replaceAll(str, find, replace) {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      return str.replace(new RegExp(escapedFind, 'g'), replace);
  }
  csvexport(){
    var exportdata=[];
    this.alltransaction.forEach(obj => { 
        var location= obj.Address1+" "+obj.Address2+" "+obj.BusinessCountry;  
        var visit_location= obj.visitor_address1+" "+obj.visitor_address2+" "+obj.visitor_region+" "+obj.visitor_country;   
        var ele={
          "Visitor Name":obj.visitor_name,
          "Visitor Email":obj.Email,
          "ExpressId":obj.ExpressId,
          "Visitor Location":this.replaceAll(visit_location, ",", " "),
          "User Name":obj.Username,
          "Gender":obj.Gender,
          "Contact number": "+"+obj.DefaultValue+" "+obj.Phone,
          "Type of ID":obj.TypeId+ ":"+obj.IdNumber,
          "DOB":this.datePipe.transform(new Date(obj.Birthday),"d MMM yyyy"),
          "Social Circles":this.replaceAll(JSON.stringify(obj.socialdata), ",", " "),
          "Business name":obj.Businessname, 
          "Business Reg/ Company No":(obj.BusinessRegister) ? obj.BusinessRegister :"",          
          "Location":this.replaceAll(location, ",", " "), 
          "Date":this.datePipe.transform(new Date(obj.MeasuresDate),"d MMM yyyy"),
          "Time":this.datePipe.transform(new Date(obj.MeasuresDate),"h.mm a"),  
          "Check Status":obj.CheckStatus, 
          "Measures Unit":obj.Measuresunit, 
          "Measures Value":obj.MeasuresValue,  
          "User (who scanned)":obj.Scanedname,     
        }
        exportdata.push(ele);
      });
      var filename="Health Transaction";
      let csvData = this.ConvertToCSV(exportdata, ['Visitor Name','Visitor Email','ExpressId','Visitor Location','User Name','Gender','Contact number','Type of ID','DOB',"Social Circles",'Business name','Business Reg/ Company No','Location','Date','Time','Check Status','Measures Unit','Measures Value','User (who scanned)']);
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
