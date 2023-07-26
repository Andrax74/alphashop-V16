import { IArticoli, ICat, IIva } from 'src/app/shared/models/Articoli';

import { ApiMsg } from 'src/app/shared/models/ApiMsg';
import { HttpClient } from '@angular/common/http';
import { IArticolo } from 'src/app/shared/models/Articolo';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {

  server : string = environment.server;
  port : string = environment.port;

  constructor(private httpClient : HttpClient) { }

  getArticoliByDesc = (descrizione : string) => {
    return this.httpClient.get<IArticoli[]>(`http://${this.server}:${this.port}/api/articoli/cerca/descrizione/${descrizione}`) //ALT + 0096 | ALT GR + '
    .pipe(
      map(response => {
        response.forEach(item => item.status = this.getDesStatoArt(item.status))
        return response;
      })
    );
  }

  getArticoliByCode = (codart: string) => {
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/codice/${codart}`)
    .pipe(
      map(response => {
        response.idStatoArt = response.status
        response.status = this.getDesStatoArt(response.status)
        return response;
      })
    );
  }

  getArticoliByEan = (barcode: string) => {
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/barcode/${barcode}`)
    .pipe(
      map(response => {
        response.idStatoArt = response.status
        response.status = this.getDesStatoArt(response.status)
        return response;
      })
    );
  }

  getDesStatoArt = (idStato: string) : string => {

    if (idStato === '1')
      return 'Attivo'
    else if (idStato === '2')
      return 'Sospeso'
    else
      return 'Eliminato'
  }

  delArticoloByCodArt = (codart: string) =>
    this.httpClient.delete(`http://${this.server}:${this.port}/api/articoli/elimina/${codart}`);

  getIva = () => this.httpClient.get<IIva[]>(`http://${this.server}:${this.port}/api/iva`);

  getCat = () => this.httpClient.get<ICat[]>(`http://${this.server}:${this.port}/api/cat`);

  updArticolo = (articolo: IArticolo) =>
    this.httpClient.put<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/modifica`, articolo);

  insArticolo = (articolo: IArticolo) =>
    this.httpClient.post<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/inserisci`, articolo);

}
