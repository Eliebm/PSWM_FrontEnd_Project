import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  paramValue$: any;
  @Output() notifyRoute: EventEmitter<string> = new EventEmitter<string>();
  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute) { }




  ngOnInit(): void {
    this.notifyRoute.emit('home');
  }

}
