import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddfaqRoutingModule } from './addfaq-routing.module';
import { AddfaqComponent } from './addfaq.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [AddfaqComponent],
  imports: [
    CommonModule,
    AddfaqRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class AddfaqModule { }
