import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [TransactionComponent]
})
export class TransactionModule { }
