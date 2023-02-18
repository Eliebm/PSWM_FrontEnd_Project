import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'pm-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  userId: any;
  refresh_token: any;
  access_token: any;

  constructor(private auth: AuthService) { }
  firstFormGroup = new FormGroup({
    firstCtrl: new FormControl(null, [Validators.required])
  });

  secondFormGroup = new FormGroup({
    secondCtrl: new FormControl(null, [Validators.required]),

  });

  ngOnInit(): void {




    if (this.auth.getTokenStorage("access_token") === null || this.auth.getWebStorageData("user") === null) {
      this.auth.logout();
    } else {
      this.userId = this.auth.getWebStorageData("user");
      this.refresh_token = this.auth.getTokenStorage("refresh_token");
      this.access_token = this.auth.getTokenStorage("access_token");
    }

    if (this.auth.isTokenExpired(this.auth.getTokenStorage("exp")) == true) {
      this.auth.refreshToken(this.userId, this.refresh_token);
    }
    console.log(this.userId);
  }
  logout(): void {

    this.auth.logout();
  }
}
