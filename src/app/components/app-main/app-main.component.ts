import { Component } from '@angular/core';


import { AppService } from '../../services/app.service';
import { AppHeaderComponent } from "../app-header/app-header.component";
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { YoutubeService } from '../../services/youtube.service';
declare var YT: any;
declare var gapi: any;
declare var $: any;


export interface Bookmark {

}

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent {

  player: any;
  currentTime: any;
  auth2: any;
  searchList: any;
  showResult: boolean;
  showIFrame: boolean;
  addBookmark: boolean;
  startTimeSecs: any;
  startTimeMins: any;
  startTimeHrs: any;
  user: any;
  videoId: string;
  bookmarkTitle: string;
  bookmarkDesc: string;
  userEmail: string;
  bookmarkList = [];
  saveSuccess: boolean;
  constructor(private appService: AppService,
    private dataService: DataService,
    private youtube: YoutubeService) { }

  ngOnInit() {
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: '390',
        width: '640',
        playerVars: { 'autoplay': 1, 'rel': 0, 'controls': 2 },
        events: {
          'onReady': (data) => {
            //   this.onPlayerReady(data);
          },
          'onStateChange': (data) => {
            //this.onPlayerStateChange(this.player.getCurrentTime())
            console.log(this.player.getCurrentTime(), )
            this.currentTime = this.player.getCurrentTime()
          },
          'onError': () => { }
        }
      });
    };
  }

  ngAfterViewInit() {
    this.appService.userDetails$.subscribe((user) => {
      this.user = user;
      this.userEmail = this.user.currentUser.get().getBasicProfile().getEmail()
      let appheader = new AppHeaderComponent(this.appService, this.dataService);
      appheader.fetchAuth(user);

      this.dataService.getBookmarks(this.userEmail).subscribe((res: Array<any>) => {
        this.bookmarkList = res;
        console.log(this.bookmarkList)
      })
    }, err => console.log(err));

    const doc = (<any>window).document;
    let playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  onPlayerStateChange(data) {
    // this.googleInit(data);
    this.currentTime = data;
  }

  search(term) {
    this.googleInit(term);
  }

  public setSigninStatus(data) {
    var user = this.auth2.currentUser.get();
    let isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
    // Toggle button text and displayed statement based on current auth status.
    if (isAuthorized) {
      this.defineRequest(data);
    }
  }

  public googleInit(data) {
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
            //  this.loadAPIClientInterfaces(data);
            this.setSigninStatus(data);
            resolve();
          } else {
            reject();
          }
        });
      });
    })
  }

  defineRequest(data) {
    this.buildApiRequest('GET',
      '/youtube/v3/search',
      {
        maxResults: '25',
        part: 'snippet',
        q: data,
        'type': ''
      });
  }

  buildApiRequest(requestMethod, path, params, properties?) {
    params = this.removeEmptyParams(params);
    var request;
    if (properties) {
      var resource = this.createResource(properties);
      request = gapi.client.request({
        'body': resource,
        'method': requestMethod,
        'path': path,
        'params': params
      });
    } else {
      request = gapi.client.request({
        'method': requestMethod,
        'path': path,
        'params': params
      });
    }
    this.executeRequest(request);
  }

  createResource(properties) {
    var resource = {};
    var normalizedProps = properties;
    for (var p in properties) {
      var value = properties[p];
      if (p && p.substr(-2, 2) == '[]') {
        var adjustedName = p.replace('[]', '');
        if (value) {
          normalizedProps[adjustedName] = value.split(',');
        }
        delete normalizedProps[p];
      }
    }
    for (var p in normalizedProps) {
      // Leave properties that don't have values out of inserted resource.
      if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
        var propArray = p.split('.');
        var ref = resource;
        for (var pa = 0; pa < propArray.length; pa++) {
          var key = propArray[pa];
          if (pa == propArray.length - 1) {
            ref[key] = normalizedProps[p];
          } else {
            ref = ref[key] = ref[key] || {};
          }
        }
      };
    }
    return resource;
  }

  removeEmptyParams(params) {
    for (var p in params) {
      if (!params[p] || params[p] == 'undefined') {
        delete params[p];
      }
    }
    return params;
  }

  executeRequest(request) {
    request.execute((response) => {
      this.showResult = true;
      this.searchList = response;
    });
  }

  // loadAPIClientInterfaces(data) {
  //   gapi.client.load('youtube', 'v3', () => {
  //     this.setSigninStatus(data);
  //   });
  // }

  onPlayerReady(data) {
    this.videoId = data
    this.showIFrame = true;
    this.player.loadVideoById({
      videoId: data,
      startSeconds: 0,
      suggestedQuality: 'large'
    })
  }

  playBookmark(data) {
    this.videoId = data.bookmark.videoId;
    this.showIFrame = true;
    let time;
    time = parseInt(data.bookmark.starttime.hrs) * 3600 + parseInt(data.bookmark.starttime.mins) * 60 + parseInt(data.bookmark.starttime.secs)
    this.player.loadVideoById({
      videoId: this.videoId,
      startSeconds: time,
      suggestedQuality: 'large'
    })
  }

  openBookmarkForm() {
    this.addBookmark = !this.addBookmark;
    let time = parseInt(this.player.getCurrentTime());
    this.startTimeHrs = Math.floor(time / 3600);
    this.startTimeHrs < 10 ? this.startTimeHrs = '0' + this.startTimeHrs : this.startTimeHrs
    time = time - this.startTimeHrs * 3600
    this.startTimeMins = Math.floor(time / 60);
    this.startTimeMins < 10 ? this.startTimeMins = '0' + this.startTimeMins : this.startTimeMins
    this.startTimeSecs = time - this.startTimeMins * 60;
    this.startTimeSecs < 10 ? this.startTimeSecs = '0' + this.startTimeSecs : this.startTimeSecs
    this.player.pauseVideo();
  }

  seekTo(time) {
    if (time == 'hrs')

      this.player.seekTo()
  }

  convertToSeconds(time) {

  }

  saveBookmark() {
    let data = {
      eMail: this.user.currentUser.get().getBasicProfile().getEmail(),
      bookmark: {
        videoId: this.videoId,
        title: this.bookmarkTitle,
        description: this.bookmarkDesc,
        starttime: {
          hrs: this.startTimeHrs,
          mins: this.startTimeMins,
          secs: this.startTimeSecs,
        }
      }
    }
    this.dataService.createBookmark(data).subscribe((res) => {
      this.bookmarkTitle = '';
      this.bookmarkDesc = '';
      this.startTimeHrs = '';
      this.startTimeMins = '';
      this.startTimeSecs = '';
      this.saveSuccess = true;
      this.addBookmark = false;
      let time = 1;
      setInterval(() => {
        time = time - 1
        if (time == 0) {
          this.saveSuccess = false;
          this.player.playVideo()
          clearInterval();
        }

      }, 1000)

      this.bookmarkList.push({ bookmark: data.bookmark })
    })
  }
}
