import { Component } from '@angular/core';
import { AppService } from '../../services/app.service'
import { DataService } from '../../services/data.service';
declare var gapi: any;
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {

  profilePic: string;
  userName: string;
  public auth2: any;

  constructor(private appService: AppService,
    private dataService: DataService) { }

  public attachSignin() {
    if (this.auth2.isSignedIn.get()) {
      var profile = this.auth2.currentUser.get().getBasicProfile();
      this.setElements(profile)
      this.profilePic = profile.getImageUrl();
      this.userName = profile.getName();
    } else {
      this.hideElements();
    }
  }

  public fetchAuth(auth) {
    this.auth2 = auth;
    let sessionObj = JSON.parse(sessionStorage.getItem('session'))
    if (sessionObj['signInMethod'] == 'local')
      this.clientSignIn()
    else if (sessionObj['signInMethod'] == 'google')
      this.attachSignin();
  }

  signOut() {
    sessionStorage.removeItem('session');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    this.hideElements();
  }

  clientSignIn() {

    var profile = {
      getImageUrl: () => `../../assets/batman-new.jpg`,
      getName: () => `${this.auth2[0].firstName} ${this.auth2[0].lastName}`,
      getEmail: () => `${this.auth2[0].eMail}`
    }
    this.setElements(profile)
  }

  hideElements() {
    document.getElementById('sign-out').setAttribute('hidden', 'true');
    document.getElementById('user-name').innerHTML = '';
    document.getElementById('profile-pic').style.display = 'none';
    document.getElementById('googleBtn').removeAttribute('hidden');
    document.getElementById('user-dropdown').style.display = 'none';
  }

  setElements(profile) {
    let userCard;
    document.getElementById('sign-out').removeAttribute('hidden');
    document.getElementById('profile-pic').style.display = 'initial';
    document.getElementById('profile-pic').setAttribute('src', profile.getImageUrl());
    userCard = `<table><thead><tr>`
    userCard += `<th rowspan="2"><img style=" border: 2px solid white;border-radius: 50%;width: 3rem; padding: 0rem; box-shadow: 0px 0px 10px grey;" src =${profile.getImageUrl()}></th>`;
    userCard += `<th>${profile.getName()}</th></tr>`;
    userCard += `<tr><td>${profile.getEmail()}</td>`
    userCard += `</tr></thead></table>`
    document.getElementById('user-name').innerHTML = userCard;
    document.getElementById('googleBtn').setAttribute('hidden', 'true');
    document.getElementById('user-dropdown').style.display = 'initial';
  }

}
