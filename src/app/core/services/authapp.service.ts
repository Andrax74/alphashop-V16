import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiMsg } from 'src/app/shared/models/ApiMsg';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  server : string = environment.server;
  port : string = environment.port;

  constructor(private httpClient : HttpClient) { }

  autenticaService = (userid: string, password: string) => {

    let AuthString : string = "Basic " + window.btoa(userid + ":" + password);
    let headers = new HttpHeaders({Authorization:  AuthString});

    return this.httpClient.get<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/test`,{headers}).pipe(
      map(
        data => {
          sessionStorage.setItem("Utente",userid);
          sessionStorage.setItem("AuthToken", AuthString);
          return data;
        }
      )
    )
  }

  loggedUser = (): string | null => (sessionStorage.getItem("Utente")) ? sessionStorage.getItem("Utente") : "";

  isLogged = (): boolean => (sessionStorage.getItem("Utente")) ? true : false;

  clearUser = (): void => sessionStorage.removeItem("Utente");

  clearAll = (): void => sessionStorage.clear();

}
