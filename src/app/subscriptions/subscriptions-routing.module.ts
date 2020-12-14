import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionsComponent} from './subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionsComponent,
    data: {
      breadcrumb: 'Subscriptions'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
