import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersauditComponent } from './usersaudit.component';


const routes: Routes = [
  {
    path: '',
    component: UsersauditComponent,
    data: {
      breadcrumb: 'Audit Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersauditRoutingModule { }
