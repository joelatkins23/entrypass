import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddadminuserComponent } from './addadminuser.component';


const routes: Routes = [
  {
    path: '',
    component: AddadminuserComponent,
    data: {
      breadcrumb: 'Add Admin User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddadminuserRoutingModule { }
