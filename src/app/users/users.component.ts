import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users= [];
  public  date_format = 'd MMM yyyy';
  dtOptions: DataTables.Settings = {};
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getuserlist();
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange:false,
      processing: true,
      searching:true,
      info:false,      
    };  
   
  }
  getuserlist(){
    this.spinner.show();
      this.api.getuserlist().subscribe(res => {
        this.spinner.hide();
        this.users=res['result'].data;
       
    }, err => {
      this.spinner.hide();
    });  
  }
 
  editUser(id){  
    const navData: NavigationExtras = {
      queryParams: {
        id: id
      }
    };
    this.router.navigate(['userdetails'], navData);
}
viewUser(id){
  const navData: NavigationExtras = {
    queryParams: {
      id: id
      }
  };
  this.router.navigate(['usersaudit'], navData);
}

export(){
    var exportdata=[];
    this.users.forEach(obj => {      
        var ele={
          "Name":obj.Name,
          "User Name":obj.UserName,
          "Email":obj.Email,
          "ExpressId":obj.ExpressId,
          "Gender":obj.Gender,
          "Birthday":obj.Birthday,
          "Phone":"+"+obj.DefaultValue+" "+obj.Phone,          
          "TypeId":obj.TypeId,
          "IdNumber":obj.IdNumber,
          "Country":obj.Country,
          "Address1":obj.Address1,
          "Address2":obj.Address2,
          "Region":obj.Region,
          "Registed Date":obj.CreateAt,
          "Verified":(obj.Status==1)?"Yes":"No"
        }
        exportdata.push(ele);
      });
      var filename="User Registration";
      let csvData = this.ConvertToCSV(exportdata, ['Name','User Name','Email','ExpressId','Gender','Birthday','Phone','TypeId','IdNumber','Country','Address1','Address2','Region','Registed Date','Verified']);
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
