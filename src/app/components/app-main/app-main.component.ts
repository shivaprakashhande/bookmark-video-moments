import { Component, OnInit, Output, EventEmitter } from '@angular/core';


import { AppService } from '../../services/app.service';
import { AppHeaderComponent } from "../app-header/app-header.component";
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent implements OnInit {

  constructor(private appService: AppService, private dataService: DataService) { }

  ngOnInit() {
    this.appService.userDetails$.subscribe((user) => {
      console.log('main', user)
      let appheader = new AppHeaderComponent(this.appService, this.dataService);
      appheader.fetchAuth(user);
    }, err => console.log(err));



  }

}
