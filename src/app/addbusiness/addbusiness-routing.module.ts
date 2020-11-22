import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddbusinessComponent } from './addbusiness.component';


const routes: Routes = [
  {
    path: '',
    component: AddbusinessComponent,
    data: {
      breadcrumb: 'business'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddbusinessRoutingModule { }
