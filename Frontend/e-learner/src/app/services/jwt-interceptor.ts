import { NewUserService } from './new-user.service';
import {
  HttpInterceptor, HttpHandler, HttpClient,
  HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  constructor(
    public auth: NewUserService,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    request = request.clone({
      withCredentials: true,
    });
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 403) {
            console.log('error 403')
            this.auth.refreshToken().subscribe()

          }
        }
        return throwError(() => err);
      })
    );
  }
}
