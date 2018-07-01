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
}
