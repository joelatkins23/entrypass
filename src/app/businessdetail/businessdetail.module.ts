import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessdetailRoutingModule } from './businessdetail-routing.module';
import { BusinessdetailComponent } from './businessdetail.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    BusinessdetailRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [BusinessdetailComponent]
})
export class BusinessdetailModule { }
