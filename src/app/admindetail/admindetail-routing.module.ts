import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdmindetailComponent} from './admindetail.component';

const routes: Routes = [
  {
    path: '',
    component: AdmindetailComponent,
    data: {
      breadcrumb: 'Audit Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmindetailRoutingModule { }
