import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HealthprofileComponent} from './healthprofile.component';

const routes: Routes = [
  {
    path: '',
    component: HealthprofileComponent,
    data: {
      breadcrumb: 'Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthprofileRoutingModule { }
