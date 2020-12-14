import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddlocationRoutingModule } from './addlocation-routing.module';
import { AddlocationComponent } from './addlocation.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
@NgModule({
  imports: [
    CommonModule,
    AddlocationRoutingModule,
    SharedModule,
    DataTablesModule,
    NgSelect2Module,
    NgxSkeletonLoaderModule
  ],
  declarations: [AddlocationComponent]
})
export class AddlocationModule { }
