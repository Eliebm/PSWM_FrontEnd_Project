import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserDataBindingService } from '../dataBinding/user-data-binding.service';
import { Idevice } from '../Model';

@Component({
  selector: 'pm-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {

  userId: any;
  refresh_token: any;
  access_token: any;
  deviceid: any;
  deviceDetails: Idevice[] = [];


  constructor(private auth: AuthService, private _route: ActivatedRoute, private _databind: UserDataBindingService) { }


  statusForm = new FormGroup({
    statusSlide: new FormControl(null, [Validators.required])
  }

  );


  ngOnInit(): void {
    this.deviceid = this._route.snapshot.paramMap.get('deviceid');


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

    this.fetchdevicedetails();

  }

  get statusSlideValid() {
    return this.statusForm.get('statusSlide');
  }


  fetchdevicedetails() {
    this._databind.fetchDeviceDetails(this.deviceid).subscribe(data => this.deviceDetails = data);

  }


  turnOn(value: MatSlideToggleChange): void {
    if (value.checked === true) {
      this._databind.turnDeviceOnOff(this.deviceid, "true");
    }
    else { this._databind.turnDeviceOnOff(this.deviceid, "false"); }



  }


  message() {
    alert("mesage");
  }
}


