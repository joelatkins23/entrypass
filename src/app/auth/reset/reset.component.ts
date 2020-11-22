import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit { 
  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) {
   
  }
  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  } 
}
