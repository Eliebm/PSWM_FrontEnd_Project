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


  ngOnInit(): void {

  }

  logout(): void {

    this.auth.logout();
  }
}
