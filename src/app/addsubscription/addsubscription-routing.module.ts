import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddsubscriptionComponent } from './addsubscriptioncomponent';


const routes: Routes = [
  {
    path: '',
    component: AddsubscriptionComponent,
    data: {
      breadcrumb: 'Subscription'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddsubscriptionRoutingModule { }
