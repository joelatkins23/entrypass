import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminprofileComponent} from './adminprofile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminprofileComponent,
    data: {
      breadcrumb: 'Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminprofileRoutingModule { }
