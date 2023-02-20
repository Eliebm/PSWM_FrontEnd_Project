import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iadmindevice, Icity, Idevice, Idistrict, Iprovince } from '../Model';

@Injectable({
  providedIn: 'root'
})
export class AdminDataBindingService {

  private apiUrl = environment.baseUrl;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  adminfetchProvinces(): Observable<Iprovince[]> {

    return this.http.post<Iprovince[]>(this.apiUrl + 'Ardmin/AdminGetAllProvinces()', {})
      .pipe(tap(data => data)
        , catchError(this.handleError));

  }
  adminfetchDistrict(id: any): Observable<Idistrict[]> {
    var data = { 'Id': id };
    return this.http.post<Idistrict[]>(this.apiUrl + 'Ardmin/AdminGetAllDistricts()', data)
      .pipe(tap(data => data), catchError(this.handleError));

  }

  adminfetchCities(id: any): Observable<Icity[]> {
    var data = { 'Id': id }
    return this.http.post<Icity[]>(this.apiUrl + 'Ardmin/AdminGetAllCities()', data)
      .pipe(tap(data => data), catchError(this.handleError));

  }

  adminfetchAllDevices(id: any): Observable<Iadmindevice[]> {
    var send = { "cityid": id }

    return this.http.post<Iadmindevice[]>(this.apiUrl + 'Ardmin/AdminFetchAllUsers()', send).pipe(tap(data => data), catchError(this.handleError));


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
