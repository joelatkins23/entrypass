import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'addhealth',
  templateUrl: './addhealth.component.html',
  styleUrls: ['./addhealth.component.css']
})
export class AddhealthComponent implements OnInit {
  new: boolean;
  id: any;
  countries = [];
  muticountries=[];
  Name = ""
  UserName = "";
  DefaultValue = "1246";
  Phone = "";
  PhoneExt = "";
  Email = "";
  Birthday = "";
  Address1 = "";
  Address2 = "";
  Region = "";
  Country = [];
  Status = "";
  submited = false;
  dropdownSettings: any = {};
  public  date_format = 'yyyy-MM-DD';
  constructor(
    private api: ApisService,
    private route: ActivatedRoute,
    private navCtrl: Location,
    private client:HttpClient,
    private formbuilder:FormBuilder,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
  ) { 
    this.route.queryParams.subscribe(data => {
      this.new = data.register === 'true' ? true : false;
      if (data && data.id) {
        this.id = data.id;
        this.getBusiness(data.id);
      }
    });
  }

  ngOnInit() {    
    this.client.get('https://restcountries.eu/rest/v2/all').subscribe(data=>{         
      for(let item in data)  {
          var element={
            name:data[item].name
          }
          this.muticountries.push(element);
          this.countries.push(data[item]);
          }    
      },error=>{
          console.log(error)
      }) 
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'name',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true
     };
  }
  
  form = this.formbuilder.group({
    email:new FormControl('',[Validators.email,Validators.required])
  })
  getCountry()
  {
      for(let item in this.countries)
      {
          if(this.countries[item].callingCodes && this.countries[item].callingCodes[0] == this.DefaultValue)
          {
              return this.countries[item].flag;
          }
      }
  }
  getBusiness(id) {
    this.spinner.show();
      this.api.getHealth(id).subscribe(res => {
        this.spinner.hide();
        if(res['result'].status==1){
          this.Name = res['result'].data.Name;
          this.UserName = res['result'].data.UserName;
          this.DefaultValue = res['result'].data.DefaultValue;
          this.Phone = res['result'].data.Phone;
          this.PhoneExt = res['result'].data.PhoneExt;
          this.Email = res['result'].data.Email;
          this.Birthday = this.datePipe.transform(new Date(res['result'].data.Birthday),"yyyy-MM-dd");        
          this.Address1 = res['result'].data.Address1;
          this.Address2 = res['result'].data.Address2;
          this.Region = res['result'].data.Region;
          this.Country = JSON.parse(res['result'].data.Country);
          this.Status=res['result'].data.Status;
        }
              
    }, err => {
      this.spinner.hide();
    });   
  }  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  submit()
  {
   
      this.submited = true;
      if(this.form.invalid)
      {
          return;
      }
      if(this.new){
          var formdata={    
            Name : this.Name,
            UserName : this.UserName,
            DefaultValue : this.DefaultValue,
            Phone : this.Phone,
            PhoneExt : this.PhoneExt,
            Email :this.Email,
            Birthday : this.Birthday,
            Address1 : this.Address1,
            Address2 : this.Address2,  
            Region : this.Region,
            Country : JSON.stringify(this.Country),
            Status : this.Status, 
            Role:'health'          
        }
        this.spinner.show();
        this.api.AddHealth(formdata).subscribe(res => {
            this.spinner.hide();
            if(res['result'].status==1){
              this.api.alerts('Success', res['result'].message, 'success');                
              this.navCtrl.back();
            }else if(res['result'].status==0){
              this.api.alerts('Error', res['result'].message, 'error');
            }
                  
        }, err => {
          this.spinner.hide();
        });          
          
      }else{
          {
            var formdataa={  
              Id:this.id,  
              Name : this.Name,
              UserName : this.UserName,
              DefaultValue : this.DefaultValue,
              Phone : this.Phone,
              PhoneExt : this.PhoneExt,
              Email :this.Email,
              Birthday : this.Birthday,
              Address1 : this.Address1,
              Address2 : this.Address2,  
              Region : this.Region,
              Country : JSON.stringify(this.Country),
              Status : this.Status,  
              Role:'health'         
          }
          this.spinner.show();
            this.api.UpdateHealth(formdataa).subscribe(res => {
              this.spinner.hide();
              if(res['result'].status==1){
                this.api.alerts('Success', res['result'].message, 'success');
                this.navCtrl.back();
              }
                    
          }, err => {
            this.spinner.hide();
          });  
            
        }
      }
  }

  back(){
    this.navCtrl.back();
  }
 
}
