import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { AuthappService } from '../core/services/authapp.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private BasicAuth: AuthappService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let AuthHeader : string = "";
    var AuthToken =  sessionStorage.getItem("AuthToken");

    AuthHeader = (AuthToken) ? AuthToken : "";

    if (this.BasicAuth.loggedUser()) {
      request = request.clone({
        setHeaders : {Authorization : AuthHeader}
      });
    }

    return next.handle(request);
  }
}
