import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessageDeleteDialogComponent } from '../message-delete-dialog/message-delete-dialog.component';
import { NotificationComponent } from './notification.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    NotificationComponent,
    MessageDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule



  ]
})
export class NotificationModule { }
