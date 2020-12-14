import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeedbackComponent} from './feedback.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent,
    data: {
      breadcrumb: 'feedback'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
