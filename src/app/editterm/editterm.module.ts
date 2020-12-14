import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdittermRoutingModule } from './editterm-routing.module';
import { EdittermComponent } from './editterm.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTablesModule } from 'angular-datatables';
import { CKEditorModule } from 'ckeditor4-angular';
@NgModule({
  imports: [
    CommonModule,
    EdittermRoutingModule,
    SharedModule,
    DataTablesModule,
    NgxSkeletonLoaderModule,
    CKEditorModule
  ],
  declarations: [EdittermComponent]
})
export class EdittermModule { }
