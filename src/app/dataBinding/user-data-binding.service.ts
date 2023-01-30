import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icity, Idistrict, Iprovince, ISignup } from '../Model';

@Injectable({
  providedIn: 'root'
})
export class UserDataBindingService {
  private apiUrl = environment.baseUrl;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  fetchProvinces(): Observable<Iprovince[]> {

    return this.http.post<Iprovince[]>(this.apiUrl + 'UserHome/GetAllProvinces()', {})
      .pipe(tap(data => data)
        , catchError(this.handleError));

  }

  fetchDistrict(id: any): Observable<Idistrict[]> {
    var data = { 'Id': id };
    return this.http.post<Idistrict[]>(this.apiUrl + 'UserHome/GetAllDistricts()', data)
      .pipe(tap(data => data), catchError(this.handleError));

  }

  fetchCities(id: any): Observable<Icity[]> {
    var data = { 'Id': id }
    return this.http.post<Icity[]>(this.apiUrl + 'UserHome/GetAllCities()', data)
      .pipe(tap(data => data), catchError(this.handleError));

  }

  fetchUserInfos(id: any): Observable<ISignup[]> {
    var data = { 'account': id }
    return this.http.post<ISignup[]>(this.apiUrl + 'UserHome/FetchUserData()', data).pipe(tap(data => data), catchError(this.handleError));



  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occured : ${err.error.message}';

    }
    else {
      errorMessage = 'Server returned code: ${err.status}, error message is : ${err.message}';

    }
    console.error(errorMessage);
    return throwError(() => errorMessage)
  }
}
