import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddhealthRoutingModule } from './addhealth-routing.module';
import { AddhealthComponent } from './addhealth.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [AddhealthComponent],
  imports: [
    CommonModule,
    AddhealthRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AddhealthModule { }
