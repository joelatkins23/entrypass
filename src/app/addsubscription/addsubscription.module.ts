import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddsubscriptionRoutingModule } from './addsubscription-routing.module';
import { AddsubscriptionComponent } from './addsubscriptioncomponent';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [AddsubscriptionComponent],
  imports: [
    CommonModule,
    AddsubscriptionRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    CKEditorModule
  ]
})
export class AddsubscriptionModule { }
