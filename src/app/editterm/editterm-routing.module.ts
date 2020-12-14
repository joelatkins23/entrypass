import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EdittermComponent} from './editterm.component';

const routes: Routes = [
  {
    path: '',
    component: EdittermComponent,
    data: {
      breadcrumb: 'Terms Of Use'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EdittermRoutingModule { }
