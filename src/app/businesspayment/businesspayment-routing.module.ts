import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinesspaymentComponent} from './businesspayment.component';

const routes: Routes = [
  {
    path: '',
    component: BusinesspaymentComponent,
    data: {
      breadcrumb: 'Subscription Payments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesspaymentRoutingModule { }
