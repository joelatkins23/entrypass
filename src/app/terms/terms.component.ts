import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: [
    './terms.component.scss'
  ],
})
export class TermsComponent implements OnInit {
  TermsOfUse:"";
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
        var TermsOfUseData =res['result'].data.filter((element) => element.Item == 'Terms');
        this.TermsOfUse=(TermsOfUseData) ? TermsOfUseData[0].Content :'';
    }, err => {
      this.spinner.hide();
    });  
  }
}
