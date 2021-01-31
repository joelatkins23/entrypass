import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinesstransactionComponent} from './businesstransaction.component';

const routes: Routes = [
  {
    path: '',
    component: BusinesstransactionComponent,
    data: {
      breadcrumb: 'Transaction'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinesstransactionRoutingModule { }
