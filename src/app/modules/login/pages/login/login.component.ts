import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { AuthJwtService } from 'src/app/core/services/authJwt.service';
import { AuthappService } from 'src/app/core/services/authapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId : string = "";
  password : string = "";

  autenticato : boolean = true;
  notlogged : boolean = false;
  expired : boolean = false;

  nologged$: Observable<string | null> = of("");
  expired$: Observable<string | null> = of("");

  errMsg : string = 'Spiacente, la userid o la password sono errati!';
  errMsg2: string = "Spiacente, devi autenticarti per poter accedere alla pagina selezionata!";
  errMsg3: string = "Sessione Scaduta! Eserguire nuovamente l'accesso!";

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private Auth: AuthJwtService) {}

  ngOnInit(): void {
    this.nologged$ = this.activeRoute.queryParamMap.pipe(
      map((params: ParamMap) => params.get('nologged')),
    );
    this.nologged$.subscribe(param => (param) ? this.notlogged = true : this.notlogged = false);

    this.expired$ = this.activeRoute.queryParamMap.pipe(
      map((params: ParamMap) => params.get('expired')),
    );
    this.expired$.subscribe(param => (param) ? this.expired = true : this.expired = false);
  }

  titolo: string = "Accesso & Autenticazione";
  sottotitolo: string = "Procedi ad inserire la userid e la password";

  gestAuth = () => {

      this.expired = false;
      this.notlogged = false;

      this.Auth.autenticaService(this.userId, this.password).subscribe({

        next: (response) => {
          console.log(response);

          this.autenticato = true;
          this.route.navigate(['welcome',this.userId]);
        },
        error: (error) => {
          console.log(error);
          this.autenticato = false;
        }
      });
  }
}
