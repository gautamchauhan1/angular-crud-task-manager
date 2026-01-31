import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  //the following method will get called on every API call.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('Interceptor caught', request.url);
    
    const myToken = this.authService.getToken();

    if(myToken)
    {
      request = request.clone({
        setHeaders:{Authorization: `Bearer ${myToken}`} // add token in Header
      })
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>
      {
        if(error.status === 401){
          this.notification.showError('Session expired, please login again');
          this.authService.logout();
        }
        return throwError(()=> error);
      })
    );
  }
}
