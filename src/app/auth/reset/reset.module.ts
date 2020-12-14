import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset.component';
import { ResetRoutingModule } from './reset-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    ResetRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ],
  declarations: [ResetComponent]
})
export class ResetModule { }
