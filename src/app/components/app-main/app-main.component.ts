import { Component } from '@angular/core';


import { AppService } from '../../services/app.service';
import { AppHeaderComponent } from "../app-header/app-header.component";
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent {

  constructor(private appService: AppService,
    private dataService: DataService) { }

  ngAfterViewInit() {
    this.appService.userDetails$.subscribe((user) => {
      let appheader = new AppHeaderComponent(this.appService, this.dataService);
      appheader.fetchAuth(user);
    }, err => console.log(err));

  }

}
