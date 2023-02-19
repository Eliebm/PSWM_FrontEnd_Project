import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { UserDataBindingService } from '../dataBinding/user-data-binding.service';
import { Idevice } from '../Model';

@Component({
  selector: 'pm-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  userId: any;
  refresh_token: any;
  access_token: any;
  deviceSelectedid: any;
  fetchdevice: Idevice[] = [];

  constructor(private auth: AuthService, private _databind: UserDataBindingService) { }
  firstFormGroup = new FormGroup({
    firstCtrl: new FormControl('', [Validators.required])
  });

  secondFormGroup = new FormGroup({
    secondCtrl: new FormControl('', [Validators.required]),

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


    this.fillDeviceSelection();
  }

  get selectValid() {
    return this.firstFormGroup.get('firstCtrl');
  }
  get serialValid() {
    return this.secondFormGroup.get('secondCtrl');
  }

  fillDeviceSelection(): void {

    this._databind.fetchAllDevices(this.userId).subscribe(data => { this.fetchdevice = data });


  }

  logout(): void {

    this.auth.logout();
  }

  submit(): void {
    var data = { "deviceId": this.selectValid?.value, "serialnumb": this.serialValid?.value }
    this._databind.refillAccount(data);
  }
}
