import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppLandingComponent } from './components/app-landing/app-landing.component';
import { AppContainerComponent } from './containers/app-container/app-container.component';
import { AppRoutingModule } from "./app.routing";
import { AppMainComponent } from './components/app-main/app-main.component';
import { AppService } from './services/app.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AppSignupComponent } from './components/app-signup/app-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppLandingComponent,
    AppContainerComponent,
    AppMainComponent,
    AppSignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AppService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
