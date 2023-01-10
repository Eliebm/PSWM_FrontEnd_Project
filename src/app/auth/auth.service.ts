import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientInterceptor } from '../http-client.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  testHttpRequest() {
    this.http.get(this.apiUrl + "Login/GetHello()", {}).subscribe(data => data);
  }
  isUserLoggedIn: boolean = false;

  checkPage(islogin: boolean) {
    this.isUserLoggedIn == true;
  }
}
