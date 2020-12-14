import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinesspaymentRoutingModule } from './businesspayment-routing.module';
import { BusinesspaymentComponent } from './businesspayment.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    BusinesspaymentRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [BusinesspaymentComponent]
})
export class BusinesspaymentModule { }
