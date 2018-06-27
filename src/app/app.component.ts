import { Component } from '@angular/core';
declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  profilePic: string;
  signedIn: boolean = false;
  userName: string;
  public auth2: any;
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
      (googleUser) => {
        this.signedIn = true;
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        document.getElementById('sign-out').removeAttribute('hidden');
        document.getElementById('profile-pic').style.display = 'initial';
        document.getElementById('profile-pic').setAttribute('src', profile.getImageUrl());
        document.getElementById('user-name').innerHTML = profile.getName();


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });

    if (this.auth2.isSignedIn.get()) {
      this.signedIn = true;
      var profile = this.auth2.currentUser.get().getBasicProfile();
      document.getElementById('sign-out').removeAttribute('hidden');
      document.getElementById('profile-pic').style.display = 'initial';
      document.getElementById('profile-pic').setAttribute('src', profile.getImageUrl());
      document.getElementById('user-name').innerHTML = profile.getName();

      this.profilePic = profile.getImageUrl();
      this.userName = profile.getName();
    } else {
      this.hideElements();
    }

  }

  ngOnInit() {
    this.hideElements();
    this.googleInit();
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    this.hideElements();
  }

  hideElements() {
    document.getElementById('sign-out').setAttribute('hidden', 'true');
    document.getElementById('user-name').innerHTML = '';
    document.getElementById('profile-pic').style.display = 'none';
  }
}
