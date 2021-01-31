import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApisService } from '../services/apis.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authServ: ApisService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): any {      
        return this.authServ.checkAdminAuth("admin").then(user => {
            if (user['user']) {
                return true;
            } else {
                this.router.navigate(['/auth/home']);
            }
        }).catch(error => {
            console.log(error);
            this.router.navigate(['/auth/home']);
        });
    }
}
