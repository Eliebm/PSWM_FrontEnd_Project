import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'pm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) { }
  envelopeNotification = 'white';
  explamationNotification = 'white';
  exclaNumb = 5;
  envolopeNumb = 5;
  isExclamation = false;
  isnotification = true;

  ngOnInit(): void {

  }
  changecolor(): void {
    this.envelopeNotification = 'red';
  }

  logout(): void {

    this.auth.logout();
  }
}
