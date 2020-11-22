import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyComponent } from './privacy.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [PrivacyComponent]
})
export class PrivacyModule { }
