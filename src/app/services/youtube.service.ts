import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var gapi: any;
declare var $: any;
@Injectable()
export class YoutubeService {

  public auth2: any;
  constructor(private http: HttpClient) {
   
  }

  public handleAuthClick(event) {
    this.auth2.signIn();
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
            this.setSigninStatus(data);
            $('#execute-request-button').click(function () {
              this.handleAuthClick(event);
            });
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
        'maxResults': '25',
        'part': 'snippet',
        'q': data,
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
    request.execute(function (response) {
      console.log(response);
    });
  }

}
