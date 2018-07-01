import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppService } from '../../services/app.service'
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';
declare var gapi: any;

export interface User {
  firstName: string;
  password: string;
  eMail: string;
  lastName?: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.css']
})
export class AppLandingComponent {
  user: User;
  profilePic: string;
  userName: string;
  public auth2: any;
  showMessage: boolean;
  message: string;
  messageType: string;

  constructor(private router: Router,
    private appService: AppService,
    private dataService: DataService) { }

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
        this.auth2.signInMethod = 'google';
        this.appService.getUserDetails(this.auth2);
        this.router.navigateByUrl('main')
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  signIn(form: NgForm) {
    if (form.valid) {
      this.dataService.getUser(form.value.eMail).subscribe((res: Array<{}>) => {
        if (res.length == 0) {
          this.showMessage = true;
          this.message = 'Email is not registered. Please Sign Up and continue...';
          this.messageType = 'danger';
        } else {
          res['signInMethod'] = 'client';
          sessionStorage.setItem('clientSignedIn', 'true');
          this.appService.getUserDetails(res);
          this.router.navigateByUrl('main');
        }
      })
    }
  }
}
