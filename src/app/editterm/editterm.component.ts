import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-editterm',
  templateUrl: './editterm.component.html',
  styleUrls: [
    './editterm.component.scss'
  ],
})
export class EdittermComponent implements OnInit {
  businesses= [];
  TermsOfUse: string;
  Privacy: string;
  dtOptions: DataTables.Settings = {};
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getConfig(); 
  }
  getConfig(){
    this.spinner.show();
      this.api.getConfig().subscribe(res => {
        this.spinner.hide();
        var TermsOfUseData =res['result'].data.filter((element) => element.Item == 'Terms');
        var PrivacyData =res['result'].data.filter((element) => element.Item == 'Privacy');
        this.TermsOfUse=(TermsOfUseData) ? TermsOfUseData[0].Content :'';
        this.Privacy=(PrivacyData) ? PrivacyData[0].Content :'';
    }, err => {
      this.spinner.hide();
    });  
  }
  create(){
    var formdata={
      Item:"Terms",
      Content:this.TermsOfUse
    }
    var formdata1={
      Item:"Privacy",
      Content:this.Privacy
    }
    this.spinner.show();
      this.api.ConfigAdd(formdata).subscribe(res => {
        if(res['result'].status==1){
          this.api.ConfigAdd(formdata1).subscribe(res => {
              this.spinner.hide();
              this.api.alerts('Success', 'Terms of Use and Privacy Updated', 'success');
          }, err => {
            this.spinner.hide();
          });  
        }
        
    }, err => {
      this.spinner.hide();
    });
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
