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

}
