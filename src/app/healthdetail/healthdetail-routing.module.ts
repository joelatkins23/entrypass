import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HealthdetailComponent} from './healthdetail.component';

const routes: Routes = [
  {
    path: '',
    component: HealthdetailComponent,
    data: {
      breadcrumb: 'Audit Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthdetailRoutingModule { }
