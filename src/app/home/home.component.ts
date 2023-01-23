import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { LoginRoutingModule } from '../login/login-routing.module';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paramValue$: any;

  constructor(private auth: AuthService) { }




  ngOnInit(): void {
    if (this.auth.isUserLoggedIn == true) {
      this.auth.refreshToken;
    } else { this.auth.logout; }
  }



}
