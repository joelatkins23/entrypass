import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersauditRoutingModule } from './usersaudit-routing.module';
import { UsersauditComponent } from './usersaudit.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [UsersauditComponent],
  imports: [
    CommonModule,
    UsersauditRoutingModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    DataTablesModule,
    SharedModule
  ]
})
export class UsersauditModule { }
