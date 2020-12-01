import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {

  phone_list: any;
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
    this.getphonelist();
  }
  gotopayment(){
    // const navData: NavigationExtras = {
    //   queryParams: {
    //     id: item.id
    //   }
    // };
    this.router.navigate(['auth/payment']);
  }
  getphonelist(){
    this.api.getphonelist().subscribe((resp) => {
     console.log(resp);
     this.phone_list=resp;
    }, error => {
    //   this.service.hideLoading();
        console.log(error);
      });
  }
}
