import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceDialogComponent } from '../add-device-dialog/add-device-dialog.component';

import { AuthService } from '../auth/auth.service';
import { UserDataBindingService } from '../dataBinding/user-data-binding.service';
import { Idevice, ISignup } from '../Model';


@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  userId: any;
  searchString: string = ''
  refresh_token: any;
  access_token: any;
  isDisable: boolean = false;
  hide = true;
  userInfos: ISignup[] = [];
  devicesData: Idevice[] = [];
  filteredDeviceData: Idevice[] = [];


  constructor(private auth: AuthService, public dialog: MatDialog, private _databind: UserDataBindingService) { }

  changePasswordFormGroup = new FormGroup({
    changePass: new FormControl(null, [Validators.required])
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


    this.fetchUSerInfo();
    this.loadUserDevices();

  }



  get changePassValid() {
    return this.changePasswordFormGroup.get('changePass');
  }

  openAddDeviceDialog(): void {

    const dialogRef = this.dialog.open(AddDeviceDialogComponent, {

    }).afterClosed().subscribe(res => { this.loadUserDevices(); });
  }


  changePass() {
    var send = { "id": this.userId, "password": this.changePassValid?.value };
    this.auth.changePassword(send);
    this.changePasswordFormGroup.reset();

  }

  fetchUSerInfo() {
    this._databind.fetchUserInfos(this.userId).subscribe(data => this.userInfos = data);


  }

  loadUserDevices() {
    this._databind.fetchAllDevices(this.userId).subscribe(data => this.devicesData = data);
    this._databind.fetchAllDevices(this.userId).subscribe(data => this.filteredDeviceData = data)

  }


  filterBySearch(event: any) {
    this.searchString = event.target.value;

    if (this.searchString === '') {

      this.filteredDeviceData = this.performFilter('');
    }
    this.filteredDeviceData = this.performFilter(this.searchString);

  }


  performFilter(filterBy: string): Idevice[] {

    filterBy = filterBy.toLocaleLowerCase();

    return this.devicesData.filter((device: Idevice) => device.name.toLocaleLowerCase().includes(filterBy))

  }

  deviceDetails(id: any) {
    location.href = "User/DeviceDetails/" + id;

  }

}
