import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppContainerComponent } from './containers/app-container/app-container.component';
import { AppMainComponent } from './components/app-main/app-main.component';
import { AppLandingComponent } from './components/app-landing/app-landing.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AppSignupComponent } from './components/app-signup/app-signup.component';
import { ErrorComponent } from './components/error/error.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: '/signIn',
        pathMatch: 'full',
    },
    {
        path: 'main',
        canActivate: [AuthGuardService],
        component: AppMainComponent
    },
    {
        path: 'signIn',
        canActivate: [AuthGuardService],
        component: AppLandingComponent
    },
    {
        path: 'signUp',
        component: AppSignupComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }