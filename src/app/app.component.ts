import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PSWM';



  constructor() { }

  ngOnInit() {


  }


}
