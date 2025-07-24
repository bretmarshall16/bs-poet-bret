import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorLoggerInterceptor implements HttpInterceptor {
  snackBar = inject(MatSnackBar);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse && event.status !== 200) {
            console.error(`HTTP response not 200:`, event);
          }
          //IN THIS API, a 200 response can still have an error status in the body
          else if (
            event instanceof HttpResponse &&
            event.status == 200 &&
            event.body.status !== undefined &&
            event.body.status !== 200
          ) {
            this.snackBar.open(event.body.reason, 'Close');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(`HTTP error:`, error);
        },
      })
    );
  }
}
