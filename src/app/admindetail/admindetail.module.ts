import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindetailRoutingModule } from './admindetail-routing.module';
import { AdmindetailComponent } from './admindetail.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    AdmindetailRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [AdmindetailComponent]
})
export class AdmindetailModule { }
