import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddfaqComponent } from './addfaq.component';


const routes: Routes = [
  {
    path: '',
    component: AddfaqComponent,
    data: {
      breadcrumb: 'FAQ'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddfaqRoutingModule { }
