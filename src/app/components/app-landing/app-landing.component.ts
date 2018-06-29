import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppService } from '../../services/app.service'
declare var gapi: any;

export interface User {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.css']
})
export class AppLandingComponent {
  User: User;
  profilePic: string;
  userName: string;
  public auth2: any;

  constructor(private router: Router, private appService: AppService) { }

  ngAfterViewInit() {
    this.googleInit();
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '606561350597-k8ip0peb3m3rhsb66jp6be3pubve7514.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
        fetch_basic_profile: true,
      });

      this.auth2.then(() => {
        this.attachSignin(document.getElementById('googleBtn'));
      });
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      () => {
        this.appService.getUserDetails(this.auth2);
        window.location.reload();
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
