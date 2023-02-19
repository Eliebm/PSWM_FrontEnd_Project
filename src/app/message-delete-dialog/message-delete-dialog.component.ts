import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDeviceDialogComponent } from '../add-device-dialog/add-device-dialog.component';
import { UserDataBindingService } from '../dataBinding/user-data-binding.service';

@Component({
  selector: 'pm-message-delete-dialog',
  templateUrl: './message-delete-dialog.component.html',
  styleUrls: ['./message-delete-dialog.component.css']
})
export class MessageDeleteDialogComponent implements OnInit {

  constructor(public dialog: MatDialogRef<AddDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _databind: UserDataBindingService) { }

  ngOnInit(): void {
  }
  confirm(): void {

    this._databind.DeleteMessages(this.data);
  }
}
