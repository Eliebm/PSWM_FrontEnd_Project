import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iprovince } from '../Model';

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
