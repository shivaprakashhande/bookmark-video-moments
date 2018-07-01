import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from "../../services/data.service";
@Component({
  selector: 'app-signup',
  templateUrl: './app-signup.component.html',
  styleUrls: ['./app-signup.component.css']
})
export class AppSignupComponent implements OnInit {

  constructor(private dataService: DataService) { }
  showMessage: boolean;
  message: string;
  messageType: string;

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form)
    if (form.valid) {

      if (form.value.password !== form.value.confirmPassword) {
        this.showMessage = true;
        this.message = 'Passwords do not match!';
        this.messageType = 'danger';
        form.controls.password.reset();
        form.controls.confirmPassword.reset();
        return;
      }
      
      this.dataService.getUser(form.value.eMail).subscribe((res: Array<{}>) => {
        if (res.length == 0) {
          this.dataService.createUser(form.value).subscribe(res => {
            if (res == 'success') {
              this.showMessage = true;
              this.message = 'Sign up successful.. Login to continue..!';
              this.messageType = 'success';
            }
            form.reset();
          })
        } else {
          this.showMessage = true;
          this.message = 'User already exists!';
          this.messageType = 'danger';
        }
      }, err => {
        console.log('error occured')
      })

    }
  }

  resetMessage() {
    this.showMessage = false;
    this.message = '';
    this.messageType = '';
  }
}
