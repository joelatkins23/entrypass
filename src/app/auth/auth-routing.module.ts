import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication',
      status: false
    },
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/basic-login.module').then(m => m.BasicLoginModule)
      },     
      {
        path: 'registration',
        loadChildren: () => import('./registration/basic-reg.module').then(m => m.BasicRegModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
      },
      {
        path: 'forgot',
        loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('../faq/faq.module').then(m => m.FaqModule)
      },
      {
        path: 'subscription',
        loadChildren: () => import('../subscription/subscription.module').then(m => m.SubscriptionModule)
      },
      
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'terms',
        loadChildren: () => import('../terms/terms.module').then(m => m.TermsModule)
      },
      {
        path: 'privacy',
        loadChildren: () => import('../privacy/privacy.module').then(m => m.PrivacyModule)
      },
      {
        path: 'reset',
        loadChildren: () => import('./reset/reset.module').then(m => m.ResetModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
