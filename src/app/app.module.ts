import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { BusinessroleComponent } from './layouts/businessrole/businessrole.component';
import { BusinessroletitleComponent } from './layouts/businessrole/title/title.component';
import { BusinessrolebreadcrumbsComponent } from './layouts/businessrole/breadcrumbs/breadcrumbs.component';
import { HealthroleComponent } from './layouts/healthrole/healthrole.component';
import { HealthroletitleComponent } from './layouts/healthrole/title/title.component';
import { HealthrolebreadcrumbsComponent } from './layouts/healthrole/breadcrumbs/breadcrumbs.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {DatePipe} from '@angular/common';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelect2Module } from 'ng-select2';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';
export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TitleComponent,    
    BreadcrumbsComponent,  
    BusinessroleComponent,
    BusinessroletitleComponent,
    BusinessrolebreadcrumbsComponent,    
    HealthroleComponent,
    
    HealthroletitleComponent,
    HealthrolebreadcrumbsComponent,    
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CKEditorModule,
    NgSelect2Module,    
    HttpClientModule,
    DataTablesModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
