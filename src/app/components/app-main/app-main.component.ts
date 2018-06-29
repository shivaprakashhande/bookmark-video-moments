import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../services/app.service';
import { AppHeaderComponent } from "../app-header/app-header.component";
@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent implements OnInit {

  constructor(private appService: AppService) { }
  @Output() user = new EventEmitter<{}>(true);

  ngOnInit() {
    this.appService.userDetails$.subscribe((user) => {
      let appheader = new AppHeaderComponent(this.appService);
      appheader.fetchAuth(user);
    }, err => console.log(err))
  }

}
