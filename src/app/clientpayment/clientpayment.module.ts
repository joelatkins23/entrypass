import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientpaymentRoutingModule } from './clientpayment-routing.module';
import { ClientpaymentComponent } from './clientpayment.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    ClientpaymentRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [ClientpaymentComponent]
})
export class ClientpaymentModule { }
