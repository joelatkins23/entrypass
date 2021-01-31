import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HealthtransactionComponent} from './healthtransaction.component';

const routes: Routes = [
  {
    path: '',
    component: HealthtransactionComponent,
    data: {
      breadcrumb: 'Transaction'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthtransactionRoutingModule { }
