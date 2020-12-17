import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusinessprofileComponent} from './businessprofile.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessprofileComponent,
    data: {
      breadcrumb: 'Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessprofileRoutingModule { }
