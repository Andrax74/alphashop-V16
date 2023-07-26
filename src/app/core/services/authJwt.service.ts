import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';
import { Token } from 'src/app/shared/models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {

  server : string = environment.server;
  port : string = environment.port;

  constructor(private httpClient : HttpClient) { }

  autenticaService(username: string, password: string) {

    return this.httpClient.post<Token>(
      `${environment.authServerUri}`, {username, password}).pipe(
        map(
          data => {
            sessionStorage.setItem("Utente", username);
            sessionStorage.setItem("AuthToken", `Bearer ${data.token}`);
            return data;
          }
        )
      );

  }

  getAuthToken = () : string => {

    let AuthHeader : string | null = "";
    AuthHeader = sessionStorage.getItem("AuthToken");

    return (AuthHeader) ? AuthHeader : "";
  }

  loggedUser = (): string | null => (sessionStorage.getItem("Utente")) ? sessionStorage.getItem("Utente") : "";

  isLogged = (): boolean => (sessionStorage.getItem("Utente")) ? true : false;

  clearUser = (): void => sessionStorage.removeItem("Utente");

  clearAll = (): void => sessionStorage.clear();
}
