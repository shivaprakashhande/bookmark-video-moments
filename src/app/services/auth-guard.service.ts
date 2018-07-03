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
export class AuthGuardService implements CanActivate {
  userName: string;
  public auth2: any;
  constructor(private router: Router, private appService: AppService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;
    return new Promise((resolve, reject) => {
      if (sessionStorage.getItem('session')) {
        let sessionObj = JSON.parse(sessionStorage.getItem('session'));
        if (sessionObj['signInMethod'] == 'google') {
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
        } else if (sessionObj['signInMethod'] == 'local') {
          resolve(true);
        }
      } else {
        if (url == '/signIn') {
          resolve(true);
        }
        else {
          this.router.navigateByUrl('signIn');
          resolve(false);
        }
      }
    })
  }

  public googleInit() {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: 'your-client-id',
          cookiepolicy: 'single_host_origin',
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
          scope: 'profile email https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner',
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
