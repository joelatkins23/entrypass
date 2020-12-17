import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessprofileRoutingModule } from './businessprofile-routing.module';
import { BusinessprofileComponent } from './businessprofile.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    BusinessprofileRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [BusinessprofileComponent]
})
export class BusinessprofileModule { }
