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

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar,) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              alert('Unauthorize access!!!')
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status == 401) {
            alert('Unauthorize access!!!')
          }
          if (error.status == 404) {
            alert('Page Not Found!!!')
          }
          if (error.status == 0) {
            this._snackBar.open("Error code " + error.status, 'Ok', {
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
