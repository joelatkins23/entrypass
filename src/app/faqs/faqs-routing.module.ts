import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FaqsComponent} from './faqs.component';

const routes: Routes = [
  {
    path: '',
    component: FaqsComponent,
    data: {
      breadcrumb: 'Faqs'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqsRoutingModule { }
