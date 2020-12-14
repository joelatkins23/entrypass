import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthpaymentRoutingModule } from './healthpayment-routing.module';
import { HealthpaymentComponent } from './healthpayment.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    HealthpaymentRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [HealthpaymentComponent]
})
export class HealthpaymentModule { }
