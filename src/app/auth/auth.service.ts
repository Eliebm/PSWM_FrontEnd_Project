import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isUserLoggedIn: boolean = false;

  checkPage(islogin: boolean) {
    this.isUserLoggedIn == true;
  }
}
