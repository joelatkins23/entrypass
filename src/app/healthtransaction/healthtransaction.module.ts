import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthtransactionRoutingModule } from './healthtransaction-routing.module';
import { HealthtransactionComponent } from './healthtransaction.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    HealthtransactionRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [HealthtransactionComponent]
})
export class HealthtransactionModule { }
