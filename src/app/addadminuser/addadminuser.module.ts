import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddadminuserRoutingModule } from './addadminuser-routing.module';
import { AddadminuserComponent } from './addadminuser.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [AddadminuserComponent],
  imports: [
    CommonModule,
    AddadminuserRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class AddadminuserModule { }
