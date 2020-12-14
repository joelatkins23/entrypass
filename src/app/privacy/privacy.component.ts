import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: [
    './privacy.component.scss'
  ],
})
export class PrivacyComponent implements OnInit {
  Privacy:"";
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
   
  }

  ngOnInit() {
    this.getConfig(); 
  }
  getConfig(){
    this.spinner.show();
      this.api.getConfig().subscribe(res => {
        this.spinner.hide();
        var PrivacyData =res['result'].data.filter((element) => element.Item == 'Privacy');
        this.Privacy=(PrivacyData) ? PrivacyData[0].Content :'';
    }, err => {
      this.spinner.hide();
    });  
  }
}
