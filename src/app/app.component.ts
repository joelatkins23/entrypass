import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
// import { Keepalive } from '@ng-idle/keepalive';
import { ApisService } from './services/apis.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  constructor(
    private router: Router,
    private idle: Idle, 
    private api: ApisService,
    // private keepalive: Keepalive,
    private translate: TranslateService) {
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
      localStorage.clear();
      this.router.navigate(['auth/home']);
    });
    // sets the ping interval to 15 seconds
    // keepalive.interval(15);

    // keepalive.onPing.subscribe(() => this.lastPing = new Date());
    
    if(localStorage.getItem('Users') && localStorage.getItem('loggedin')){
      idle.watch()
      this.timedOut = false;
    }else{
      idle.stop();
    } 

    const lng = localStorage.getItem('lng');
    if (!lng || lng === null) {
      localStorage.setItem('lng', 'en');
    }
    this.translate.use(localStorage.getItem('lng'));
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  reset() {
    this.idle.watch();
    this.timedOut = false;
  }  

}
