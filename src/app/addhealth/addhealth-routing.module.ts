import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddhealthComponent } from './addhealth.component';


const routes: Routes = [
  {
    path: '',
    component: AddhealthComponent,
    data: {
      breadcrumb: 'Health Organization'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddhealthRoutingModule { }
