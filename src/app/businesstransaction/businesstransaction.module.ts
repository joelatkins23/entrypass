import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinesstransactionRoutingModule } from './businesstransaction-routing.module';
import { BusinesstransactionComponent } from './businesstransaction.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    BusinesstransactionRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [BusinesstransactionComponent]
})
export class BusinesstransactionModule { }
