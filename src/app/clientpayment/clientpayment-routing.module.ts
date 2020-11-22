import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientpaymentComponent} from './clientpayment.component';

const routes: Routes = [
  {
    path: '',
    component: ClientpaymentComponent,
    data: {
      breadcrumb: 'Transaction'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientpaymentRoutingModule { }
