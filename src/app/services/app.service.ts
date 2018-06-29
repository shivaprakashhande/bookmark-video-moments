import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject }    from 'rxjs';

@Injectable()
export class AppService {

  private userDetails = new BehaviorSubject<{}>({});
  userDetails$ = this.userDetails.asObservable();
  constructor() { }

  getUserDetails(user){
    console.log(user)
    this.userDetails.next(user);
    console.log(this.userDetails)
  }
}
