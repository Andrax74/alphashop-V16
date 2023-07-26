import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';

import { AuthJwtService } from './authJwt.service';
import { AuthappService } from './authapp.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  token : string = '';
  ruoli : string[] = new Array();
  items : any;

  constructor(
    private Auth: AuthJwtService,
    private route: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.token = this.Auth.getAuthToken();

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);

    this.items = decodedToken['authorities'];

    if (!Array.isArray(this.items))
      this.ruoli.push(this.items);
    else
      this.ruoli = this.items;

      if (!this.Auth.isLogged()) {
        console.log("Accesso NON Consentito");
        this.route.navigate(['login'],{ queryParams: {nologged: true}});

        return false;
      }
      else {
        let roles : string[] = new Array();
        roles = next.data['roles'];

        if (roles === null || roles.length === 0) {
          return true;
        }
        else if (this.ruoli.some(r => roles.includes(r))) {
          return true;
        }
        else {
          this.route.navigate(['forbidden']);
          return false;
        }
      }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(RouteGuardService).canActivate(next, state);
}
