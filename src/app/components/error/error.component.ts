import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  error: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.error =JSON.parse(params['error']);
    });

  }

}
