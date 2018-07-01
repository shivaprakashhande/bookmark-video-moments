import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

import { AppService } from './app.service'
declare var gapi: any;
@Injectable()
export class AuthGuardService {
  userName: string;
  public auth2: any;
  constructor(private router: Router, private appService: AppService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;
    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('clientSignedIn')) {
        resolve(true);
      } else {
        this.googleInit().then(() => {
          this.appService.getUserDetails(this.auth2)
          if (url == '/signIn') {
            this.router.navigateByUrl('main');
            resolve(false);
          }
          else {
            resolve(true);
          }

        }, () => {
          if (url == '/signIn') {
            resolve(true);
          }
          else {
            this.router.navigateByUrl('signIn');
            resolve(false);
          }
        })
      }
    })
  }

  public googleInit() {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '606561350597-k8ip0peb3m3rhsb66jp6be3pubve7514.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
          fetch_basic_profile: true,
        });

        this.auth2.then(() => {
          if (this.auth2.isSignedIn.get()) {
            resolve();
          } else {
            reject();
          }
        });
      });
    })
  }
}
