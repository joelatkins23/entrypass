import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthprofileRoutingModule } from './healthprofile-routing.module';
import { HealthprofileComponent } from './healthprofile.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  imports: [
    CommonModule,
    HealthprofileRoutingModule,
    SharedModule,
    DataTablesModule,
    NgMultiSelectDropDownModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [HealthprofileComponent]
})
export class HealthprofileModule { }
