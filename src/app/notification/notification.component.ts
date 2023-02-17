import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'pm-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  logout(): void {

    this.auth.logout();
  }

}
