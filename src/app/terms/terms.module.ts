import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './terms.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    TermsRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [TermsComponent]
})
export class TermsModule { }
