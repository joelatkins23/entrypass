import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessComponent} from './business.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    data: {
      breadcrumb: 'Business'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
