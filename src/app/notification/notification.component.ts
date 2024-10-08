import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { UserDataBindingService } from '../dataBinding/user-data-binding.service';
import { Inotification } from '../Model';
import { MessageDeleteDialogComponent } from '../message-delete-dialog/message-delete-dialog.component';

@Component({
  selector: 'pm-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  deviceid: any;
  messageType: any;
  userId: any;
  refresh_token: any;
  access_token: any;
  messagesData: Inotification[] = [];

  constructor(private auth: AuthService, private _route: ActivatedRoute, private _databind: UserDataBindingService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.deviceid = this._route.snapshot.paramMap.get('device');
    this.messageType = this._route.snapshot.paramMap.get('type');




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

    this.loadMessages();
  }
  logout(): void {

    this.auth.logout();
  }
  deletemessage(id: any): void {

    const dialogRef = this.dialog.open(MessageDeleteDialogComponent, {
      data: id,
    }).afterClosed().subscribe(res => { this.loadMessages(); });




  }

  loadMessages(): void {
    this._databind.loadMessages(this.deviceid, this.messageType).subscribe(data => {
      this.messagesData = data
    });

  }

}
