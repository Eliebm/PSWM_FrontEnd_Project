import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar, private _router: Router) {
    if (this._router.url === '/Login') {
      this.verticalPosition = 'top';
    }

  }




  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {

            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            this._snackBar.open("Unauthorize access :  Invalid Email or password ", 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else if (error.status === 404) {
            this._snackBar.open("The HTTP 404 Not Found  " + error.status, 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else if (error.status === 0) {
            this._snackBar.open("Could Not Connect to server status:" + error.status, 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else if (error.status === 400) {
            this._snackBar.open("Database connection error  " + error.status, 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          else {
            this._snackBar.open("Error code: " + error.status, 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,

            });

          }
        }

      }
      )
    );

  }
}
