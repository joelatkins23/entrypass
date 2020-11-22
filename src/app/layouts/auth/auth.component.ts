import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { state, style, transition, animate, trigger, AUTO_STYLE } from '@angular/animations';
import 'rxjs/add/operator/filter';
import { ApisService } from 'src/app/services/apis.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class AuthComponent implements OnInit {
  login=false;
  name="";
  type="";
  isCollapsedMobile = 'no-block';
  constructor(
    private api: ApisService,
    private router: Router,
    private translate: TranslateService
  ) { 
    this.getUsers();
  }
  
  ngOnInit() {
  }
  getUsers() {
    if(localStorage.getItem('uid')){
      this.api.getProfile(localStorage.getItem('uid')).then((info: any) => {
        if (info && info.type === 'admin') {
         this.name="Admin";
         this.type=info.type;
        }else if(info && info.type=='delivery') {
          this.name="Client";
          this.type=info.type;
        }
      }, error => {
        console.log(error);
      }).catch(error => {
        console.log(error);
      });
      this.login=true;
    };    
  }
  logout() {
    this.api.logout().then(() => {
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
    localStorage.clear();
    this.login=false;
    this.router.navigate(['auth/home']);
  } 
}
