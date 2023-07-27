import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { AppCookieService } from '../core/services/app-cookie.service';
import { AuthJwtService } from '../core/services/authJwt.service';
import { AuthappService } from '../core/services/authapp.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private Auth: AuthJwtService,
    private storageService : AppCookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let AuthHeader : string = "";
    var authToken = this.storageService.get("AuthToken");
    var newToken = "";

    if (authToken) {
      this.Auth.refreshToken(authToken);
      newToken = this.storageService.get("AuthToken");
    }

    AuthHeader = (newToken) ? newToken : "";

    if (this.Auth.loggedUser()) {
      request = request.clone({
        setHeaders : {Authorization : AuthHeader}
      });
    }

    return next.handle(request);
  }
}
