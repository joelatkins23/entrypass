import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApisService } from '../services/apis.service';

@Injectable({
    providedIn: 'root'
})
export class BusinessauthGuard implements CanActivate {

    constructor(private authServ: ApisService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): any {    
        return this.authServ.checkAuth("business").then(user => {
            if (user) {
                if(user['user'].CreatedBy=="admin"){
                    return true;
                }else{               
                    if(user['checkstatus']){  
                        return true;                                             
                    }else{
                        this.router.navigate(['/auth/subscription']);
                    }   
                }
               
            } else {
                this.router.navigate(['/auth/home']);
            }
        }).catch(error => {
            console.log(error);
            this.router.navigate(['/auth/home']);
        });
    }
}
