import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceDialogComponent } from '../add-device-dialog/add-device-dialog.component';

import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  userId: any;
  refresh_token: any;
  access_token: any;
  isDisable: boolean = false;
  hide = true;


  constructor(private auth: AuthService, public dialog: MatDialog) { }

  changePasswordFormGroup = new FormGroup({
    changePass: new FormControl(null, [Validators.required])
  });




  ngOnInit(): void {

    /*if (this.auth.getTokenStorage("access_token") === null || this.auth.getWebStorageData("user") === null) {
      this.auth.logout();
    } else {
      this.userId = this.auth.getWebStorageData("user");
      this.refresh_token = this.auth.getTokenStorage("refresh_token");
      this.access_token = this.auth.getTokenStorage("access_token");
    }

    if (this.auth.isTokenExpired(this.auth.getTokenStorage("exp")) == true) {
      this.auth.refreshToken(this.userId, this.refresh_token);
    }*/


  }
  get changePassValid() {
    return this.changePasswordFormGroup.get('changePass');
  }

  openAddDeviceDialog(): void {

    const dialogRef = this.dialog.open(AddDeviceDialogComponent, {

    });
  }


  filterBySearch($event: any) {
    console.log($event.value);
  }

}
