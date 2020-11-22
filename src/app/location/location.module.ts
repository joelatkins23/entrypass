import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    LocationRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [LocationComponent]
})
export class LocationModule { }
