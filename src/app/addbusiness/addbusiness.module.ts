import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddbusinessRoutingModule } from './addbusiness-routing.module';
import { AddbusinessComponent } from './addbusiness.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [AddbusinessComponent],
  imports: [
    CommonModule,
    AddbusinessRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class AddbusinessModule { }
