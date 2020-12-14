import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessdetailComponent} from './businessdetail.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessdetailComponent,
    data: {
      breadcrumb: 'Audit Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessdetailRoutingModule { }
