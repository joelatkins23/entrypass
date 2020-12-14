import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-healthpayment',
  templateUrl: './healthpayment.component.html',
  styleUrls: [
    './healthpayment.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HealthpaymentComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  alltransaction:any[] = [];
  alldata:any[] = [];
  muticountries:any[] = [];
  selectedcoutries:any[] = [];
  dropdownSettings: any = {};
  public  date_format = 'd MMM yyyy';
  public  time_format = 'h.mm a';
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
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
      this.api.GetHealthTransaction(user.Id).subscribe(res => {
        this.spinner.hide();
        this.alltransaction=res['result'].data;  
        this.alldata=res['result'].data; 
        this.muticountries=JSON.parse(user.Country);
        this.selectedcoutries=JSON.parse(user.Country); 
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
  export(){
    var exportdata=[];
    this.alltransaction.forEach(obj => {      
       var ele={
         "Business Name":obj.Businessname,
         "User Name":obj.Username,
         "Check Status":obj.CheckStatus,
         "Measures Unit":obj.Measuresunit,
         "Measures Value":obj.MeasuresValue,
         "Date":obj.MeasuresDate,
         "Country":obj.BusinessCountry,
         "Location":obj.Address1+" "+obj.Address2,               
         "User (who scanned)":obj.Scanedname,
       }
       exportdata.push(ele);
    });
    var filename="Health Transaction";
    let csvData = this.ConvertToCSV(exportdata, ['Business Name','User Name','Check Status','Measures Unit','Measures Value','Date','Country','Location','User (who scanned)']);
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
