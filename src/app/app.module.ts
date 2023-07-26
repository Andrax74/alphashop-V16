import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArticoliModule } from './modules/articoli/articoli.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { ErrorsModule } from './modules/errors/errors.module';
import { FormsModule } from '@angular/forms';
import { GestErrorInterceptor } from './interceptors/gest-error.interceptor';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { LogoutModule } from './modules/logout/logout.module';
import { NetworkInterceptor } from './interceptors/network.interceptor';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ArticoliModule,
    ErrorsModule,
    HomeModule,
    LoginModule,
    LogoutModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: GestErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
