import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../Model';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl;
  data: any = [];
  currentDate = new Date();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }




  userLogin(sendata: object) {
    this.http.post<ILogin>(this.apiUrl + "Login/Login()", sendata).subscribe(data => {
      this.setTokenStorage("access_token", data.accessToken);
      this.setTokenStorage("refresh_token", data.refreshToken);
      this.setTokenStorage("exp", data.expireDate);
      this.setWebStorageData("user", data.ID);
      location.href = "/User/Home";

    });

  }
  adminLogin(sendata: object) {
    this.http.post(this.apiUrl + "Login/AdminLogin()", sendata).subscribe(data => {
      if (data === 1) {
        location.href = "/Admin/Home";



      }

    });

  }

  userSignup(sendata: object) {
    this.http.post(this.apiUrl + "Login/SignUp()", sendata).subscribe(data => {
      if (data === 1) {
        this._snackBar.open("Congratulations:  Your account has been successfully created.", 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      }
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

  isTokenExpired(token_exp: any): boolean {
    if (this.currentDate.getTime() > token_exp) {
      return true;
    }
    else { return false; }
  }

  refreshToken(id: any, token: any) {
    var answer = { "id": id, "token": token };
    this.http.post<ILogin>(this.apiUrl + 'Login/RefreshToken()', answer).subscribe(data => {
      if (data.response != 1) {
        this.setTokenStorage("access_token", data.accessToken);
        this.setTokenStorage("refresh_token", data.refreshToken);
        this.setTokenStorage("exp", data.expireDate);

      }
      else {
        alert("Access Forbidden... Please Login again !");
        this.logout();


      }


    }
    );
  }
}
