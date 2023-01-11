import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  testHttpRequest() {
    this.http.post(this.apiUrl + "Login/GetAllProvinces()", {}).subscribe(data => data);
  }
  isUserLoggedIn: boolean = false;

  checkPage(islogin: boolean) {
    this.isUserLoggedIn == true;
  }
}
