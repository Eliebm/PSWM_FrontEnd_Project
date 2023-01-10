import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzMzNzY1MjEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwIn0.q4ImofzXCScrGbqRn1p3tx5vVrgUtyQhiCk1MxB0TcI';
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthenticationToken(request));
  }
  addAuthenticationToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }
}
