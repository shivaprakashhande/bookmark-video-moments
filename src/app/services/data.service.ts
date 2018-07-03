import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  createUser(user) {
    return this.http.post('/api', user)
  }

  getUser(user:string) {
    return this.http.get(`api/user/${user}`);
  }

  createBookmark(bookmark) {
    console.log('data service', bookmark)
    return this.http.post('/api/bookmark', bookmark)
  }

  getBookmarks(user:string) {
    return this.http.get(`api/bookmark/${user}`);
  }

  getVideoDetails(){
    return this.http.get(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyDYHVBL7-FYlBVvKJ2UKa1YaoSdxjR1Nrg&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`)
  }
}
