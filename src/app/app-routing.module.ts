import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { ClientComponent } from './layouts/client/client.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from './guard/auth.guard';
import { ClientauthGuard } from './clientguard/auth.guard';
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
        path: 'subscriptions',
        loadChildren: () => import('./subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
        canActivate: [AuthGuard]
      },     
    ]
  },
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        redirectTo: 'location',
        pathMatch: 'full'
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
        canActivate: [ClientauthGuard]
      },  
      {
        path: 'client_payments',
        loadChildren: () => import('./clientpayment/clientpayment.module').then(m => m.ClientpaymentModule),
        canActivate: [ClientauthGuard]
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
