import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddlocationComponent} from './addlocation.component';

const routes: Routes = [
  {
    path: '',
    component: AddlocationComponent,
    data: {
      breadcrumb: 'Add Location'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddlocationRoutingModule { }
