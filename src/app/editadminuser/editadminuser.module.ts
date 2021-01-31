import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditadminuserRoutingModule } from './editadminuser-routing.module';
import { EditadminuserComponent } from './editadminuser.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EditadminuserComponent],
  imports: [
    CommonModule,
    EditadminuserRoutingModule,
    NgxSpinnerModule,
    NgbTabsetModule,
    SharedModule
  ]
})
export class EditadminuserModule { }
