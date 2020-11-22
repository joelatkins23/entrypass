import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit { 
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
  resetsubmit(){
    // const navData: NavigationExtras = {
    //   queryParams: {
    //     id: item.id
    //   }
    // };
    this.router.navigate(['auth/reset']);
  }
}
