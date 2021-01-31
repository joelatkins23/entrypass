import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditadminuserComponent } from './editadminuser.component';


const routes: Routes = [
  {
    path: '',
    component: EditadminuserComponent,
    data: {
      breadcrumb: 'Edit Admin User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditadminuserRoutingModule { }
