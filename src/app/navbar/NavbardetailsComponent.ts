import { MatTooltipModule } from '@angular/material/tooltip';


import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'pm-navbar-details',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbardetailsComponent implements OnInit {

  constructor(private auth: AuthService) { }


  ngOnInit(): void {
  }

  logout(): void {

    this.auth.logout();
  }
}
