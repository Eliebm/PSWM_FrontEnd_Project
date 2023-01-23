import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../Model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient,) { }
  isUserLoggedIn: boolean = false;
  data: any = [];


  testHttpRequest(sendata: object) {
    this.http.post<ILogin>(this.apiUrl + "Login/Login()", sendata).subscribe(data => {
      this.setTokenStorage("access_token", data.accessToken);
      this.setTokenStorage("refresh_token", data.refreshToken);
      this.setTokenStorage("exp", data.expireDate);
      location.href = "/Home";
      this.isUserLoggedIn = true;
    });

  }


  setTokenStorage(type: string, token: string) {
    localStorage.setItem(type, token)
  }
  getTokenStorage(type: string) {
    return localStorage.getItem(type);
  }
  getWebStorageData(itemKey: string) {

    return sessionStorage.getItem(itemKey);
  }

  setWebStorageData(itemKey: string, itemValue: string) {
    sessionStorage.setItem(itemKey, itemValue);

  }
  logout() {
    location.href = "/Login";
    sessionStorage.clear();
    localStorage.clear();
  }

  isTokenExpired(token: string) {

    const expiry = JSON.parse(atob(token.split('.')[1]));

    return expiry.exp > Date.now();
  }

  refreshToken(token: any) {
    this.http.post(this.apiUrl + "RefreshToken()", { 'RefreshToken': token }).subscribe((resp: any) => {
      this.setTokenStorage('refresh_token', resp.RefreshToken);
      this.setTokenStorage('access_token', resp.AccessToken);


    }
    );
  }
}
