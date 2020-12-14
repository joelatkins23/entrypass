import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthdetailRoutingModule } from './healthdetail-routing.module';
import { HealthdetailComponent } from './healthdetail.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    HealthdetailRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [HealthdetailComponent]
})
export class HealthdetailModule { }
