import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { BusinessroleComponent } from "./layouts/businessrole/businessrole.component";
import { HealthroleComponent } from "./layouts/healthrole/healthrole.component";
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { BusinessauthGuard } from './businessguard/auth.guard';
import { HealthauthGuard } from './healthguard/auth.guard';

import { SetupAuthGuard } from './setupGuard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'healthdetail',
        loadChildren: () => import('./healthdetail/healthdetail.module').then(m => m.HealthdetailModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'addhealth',
        loadChildren: () => import('./addhealth/addhealth.module').then(m => m.AddhealthModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'business',
        loadChildren: () => import('./business/business.module').then(m => m.BusinessModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'addbusiness',
        loadChildren: () => import('./addbusiness/addbusiness.module').then(m => m.AddbusinessModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'businessdetail',
        loadChildren: () => import('./businessdetail/businessdetail.module').then(m => m.BusinessdetailModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'userdetails',
        loadChildren: () => import('./userdetails/userdetails.module').then(m => m.UserdetailsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'usersaudit',
        loadChildren: () => import('./usersaudit/usersaudit.module').then(m => m.UsersauditModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'payments',
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'faqs',
        loadChildren: () => import('./faqs/faqs.module').then(m => m.FaqsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'addfaq',
        loadChildren: () => import('./addfaq/addfaq.module').then(m => m.AddfaqModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'subscriptions',
        loadChildren: () => import('./subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
        canActivate: [AuthGuard]
      },   
      {
        path: 'addsubscription',
        loadChildren: () => import('./addsubscription/addsubscription.module').then(m => m.AddsubscriptionModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'terms',
        loadChildren: () => import('./editterm/editterm.module').then(m => m.EdittermModule),
        canActivate: [AuthGuard]
      },    
    ]
  },
  {
    path: '',
    component: BusinessroleComponent,
    children: [
      {
        path: '',
        redirectTo: 'location',
        pathMatch: 'full'
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
        canActivate: [BusinessauthGuard]
      }, 
      {
        path: 'addlocation',
        loadChildren: () => import('./addlocation/addlocation.module').then(m => m.AddlocationModule),
        canActivate: [BusinessauthGuard]
      }, 
      {
        path: 'business_transaction',
        loadChildren: () => import('./businesspayment/businesspayment.module').then(m => m.BusinesspaymentModule),
        canActivate: [BusinessauthGuard]
      }    
    ]
  },
  {
    path: '',
    component: HealthroleComponent,
    children: [
      {
        path: '',
        redirectTo: 'health_transaction',
        pathMatch: 'full'
      },    
      {
        path: 'health_transaction',
        loadChildren: () => import('./healthpayment/healthpayment.module').then(m => m.HealthpaymentModule),
        canActivate: [HealthauthGuard]
      }    
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [SetupAuthGuard]
      },
      {
        path: 'setup',
        loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule)
      },
    ]
  }, 
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
