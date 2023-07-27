import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppCookieService } from './app-cookie.service';
import { Injectable } from '@angular/core';
import { Token } from 'src/app/shared/models/Token';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {

  server : string = environment.server;
  port : string = environment.port;

  constructor(
    private httpClient : HttpClient,
    private storageService : AppCookieService) { }

  autenticaService(username: string, password: string) {

    return this.httpClient.post<Token>(
      `${environment.authServerUri}`, {username, password}).pipe(
        map(
          data => {
            sessionStorage.setItem("Utente", username);
            //sessionStorage.setItem("AuthToken", `Bearer ${data.token}`);
            this.storageService.set("AuthToken", `Bearer ${data.token}`);
            return data;
          }
        )
      );

  }

  refreshToken = (token: string) => {
    console.log("Esecuzione Refresh Token");

    return this.httpClient.get<Token>(
      `${environment.authServerUri}`, { headers: new HttpHeaders({'Authorization': token})}).pipe(
        map(
          data => {
            this.storageService.set("AuthToken", `Bearer ${data.token}`)
            return data;
          }
        )
      );
  }

  getAuthToken = () : string => {

    let AuthHeader : string | null = "";
    //AuthHeader = sessionStorage.getItem("AuthToken");
    AuthHeader =  this.storageService.get("AuthToken");

    return (AuthHeader) ? AuthHeader : "";
  }

  loggedUser = (): string | null => (sessionStorage.getItem("Utente")) ? sessionStorage.getItem("Utente") : "";

  isLogged = (): boolean => (sessionStorage.getItem("Utente")) ? true : false;

  clearUser = (): void => sessionStorage.removeItem("Utente");

  clearAll = (): void => {

    this.storageService.clear();
    sessionStorage.clear();
  }
}
