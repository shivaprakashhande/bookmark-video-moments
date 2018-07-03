import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
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
    private dataService: DataService,
    private zone: NgZone) { }

  ngAfterViewInit() {
    this.googleInit();
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: 'your-client-id',
        cookiepolicy: 'single_host_origin',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        scope: 'profile email https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner',
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
        let sessionObj = {
          'signInMethod': 'google',
        }

        sessionStorage.setItem('session', JSON.stringify(sessionObj))
        this.auth2.signInMethod = 'google';
        this.appService.getUserDetails(this.auth2);
        this.zone.run(() => { this.router.navigate(['main']) })

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
          return;
        } else {

          if (form.value.password !== res[0]['password']) {
            this.showMessage = true;
            this.message = 'Incorrect password';
            this.messageType = 'danger';
            return;
          }

          let sessionObj = {
            'signInMethod': 'local',
          }

          sessionStorage.setItem('session', JSON.stringify(sessionObj))
          res['signInMethod'] = 'local';
          this.appService.getUserDetails(res);
          this.router.navigateByUrl('main');
        }
      })
    }
  }
}
