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
        path: 'profile',
        loadChildren: () => import('./adminprofile/adminprofile.module').then(m => m.AdminprofileModule),
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
      {
        path: 'setting',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
      },  
      {
        path: 'transaction',
        loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
        canActivate: [AuthGuard]
      
      },
      {
        path: 'adminuser',
        loadChildren: () => import('./adminuser/adminuser.module').then(m => m.AdminuserModule),
        canActivate: [AuthGuard]
      } ,
      {
        path: 'addadminuser',
        loadChildren: () => import('./addadminuser/addadminuser.module').then(m => m.AddadminuserModule),
        canActivate: [AuthGuard]
      } ,
      {
        path: 'editadminuser',
        loadChildren: () => import('./editadminuser/editadminuser.module').then(m => m.EditadminuserModule),
        canActivate: [AuthGuard]
      } ,
      {
        path: 'admindetail',
        loadChildren: () => import('./admindetail/admindetail.module').then(m => m.AdmindetailModule),
        canActivate: [AuthGuard]
      } 
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
        path: 'business_profile',
        loadChildren: () => import('./businessprofile/businessprofile.module').then(m => m.BusinessprofileModule),
        canActivate: [BusinessauthGuard]
      }, 
      {
        path: 'addlocation',
        loadChildren: () => import('./addlocation/addlocation.module').then(m => m.AddlocationModule),
        canActivate: [BusinessauthGuard]
      }, 
      {
        path: 'business_payment',
        loadChildren: () => import('./businesspayment/businesspayment.module').then(m => m.BusinesspaymentModule),
        canActivate: [BusinessauthGuard]
      }, 
      {
        path: 'business_transaction',
        loadChildren: () => import('./businesstransaction/businesstransaction.module').then(m => m.BusinesstransactionModule),
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
        loadChildren: () => import('./healthtransaction/healthtransaction.module').then(m => m.HealthtransactionModule),
        canActivate: [HealthauthGuard]
      },    
      {
        path: 'health_profile',
        loadChildren: () => import('./healthprofile/healthprofile.module').then(m => m.HealthprofileModule),
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
