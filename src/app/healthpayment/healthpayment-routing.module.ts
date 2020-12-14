import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HealthpaymentComponent} from './healthpayment.component';

const routes: Routes = [
  {
    path: '',
    component: HealthpaymentComponent,
    data: {
      breadcrumb: 'Transaction'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthpaymentRoutingModule { }
