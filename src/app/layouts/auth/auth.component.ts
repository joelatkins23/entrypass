import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { state, style, transition, animate, trigger, AUTO_STYLE } from '@angular/animations';
import 'rxjs/add/operator/filter';
import { ApisService } from 'src/app/services/apis.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
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
  business_active=false;
  name="";
  type="";
  isCollapsedMobile = 'no-block';
  timedOut = false;
  constructor(
    private api: ApisService,
    private router: Router,
    private idle: Idle, 
    private translate: TranslateService
  ) {
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(600);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {    
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => {
      this.timedOut = true;
      this.logout();
    });
    
    if(localStorage.getItem('Users') && localStorage.getItem('loggedin')){
      idle.watch()
      this.timedOut = false;
    }else{
      idle.stop();
    }  

    if(localStorage.getItem('Users') && localStorage.getItem('loggedin')){
      var userdata = localStorage.getItem('Users');
      var user=JSON.parse(userdata);
      if (user && (user.Role === 'admin' || user.Role === 'superadmin')) {
        this.name=user.Name;
        this.type=user.Role;
       }else if(user && user.Role=='business') {
          this.name=user.Name;
          this.type=user.Role;
         if(user.CreatedBy=='admin'){
          this.business_active=true;
         }else{
          this.api.checkpayment(user.Id).subscribe(res => {
            if(res['result']){                            
                this.business_active=true;                           
              }else{
                this.business_active=false;  
              }            
          });
         }         
       }else if(user && user.Role=='health') {
        this.name=user.Name;
        this.type=user.Role;
      }
       this.login=true;
    }    
  }
  
  ngOnInit() {
  }
 reset() {
    this.idle.watch();
    this.timedOut = false;
  }
  logout() {    
    localStorage.clear();
    this.login=false;
    this.router.navigate(['auth/home']);
  } 
}
