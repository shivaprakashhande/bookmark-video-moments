import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppLandingComponent } from './components/app-landing/app-landing.component';
import { AppContainerComponent } from './containers/app-container/app-container.component';
import { AppRoutingModule } from "./app.routing";
import { AppMainComponent } from './components/app-main/app-main.component';
import { AppService } from './services/app.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AppSignupComponent } from './components/app-signup/app-signup.component';
import { DataService } from './services/data.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { ErrorComponent } from './components/error/error.component';
import { ErrorhandlerService } from './services/errorhandler.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppLandingComponent,
    AppContainerComponent,
    AppMainComponent,
    AppSignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AppService, 
    AuthGuardService, 
    DataService,
    ErrorhandlerService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
