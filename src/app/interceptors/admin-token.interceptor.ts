import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AdminTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AdminAuthService, private router: Router, private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();

    if(token){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['admin-login'])
            this.dialog.closeAll();
            console.log("token timed out")
          }
        }
        this.router.navigate(['admin-login'])
        this.dialog.closeAll();
        return throwError(() => new Error("System Error"))
      })
    )
  }
}
