import { RouterModule, Routes } from '@angular/router';

import { ArticoliComponent } from './modules/articoli/pages/articoli/articoli.component';
import { AuthGuard } from 'src/app/core/services/route-guard.service';
import { ErrorComponent } from './modules/errors/pages/error/error.component';
import { ForbiddenComponent } from './modules/errors/pages/forbidden/forbidden.component';
import { GestartComponent } from './modules/articoli/pages/gestart/gestart.component';
import { GridArticoliComponent } from './modules/articoli/pages/grid-articoli/grid-articoli.component';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { LogoutComponent } from './modules/logout/pages/logout/logout.component';
import { NgModule } from '@angular/core';
import { RegistrazioneComponent } from './modules/login/pages/registrazione/registrazione.component';
import { Ruoli } from './shared/models/Ruoli';
import { SettingsComponent } from './modules/login/pages/settings/settings.component';
import { WelcomeComponent } from './modules/home/pages/welcome/welcome.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component : RegistrazioneComponent},
  {path:'user/settings', component : SettingsComponent},
  {path:'welcome', component: WelcomeComponent, canActivate:[AuthGuard], data: { roles: [Ruoli.utente] }},
  {path:'welcome/:userid', component: WelcomeComponent, canActivate:[AuthGuard], data: { roles: [Ruoli.utente] } },
  {path:'articoli', component : ArticoliComponent, canActivate:[AuthGuard], data: { roles: [Ruoli.utente] }},
  {path:'articoli/grid', component : GridArticoliComponent, canActivate:[AuthGuard], data: { roles: [Ruoli.utente] }},
  {path:'gestart/:codart', component : GestartComponent, canActivate:[AuthGuard], data: { roles: [Ruoli.amministratore] }},
  {path:'gestart', component : GestartComponent, canActivate:[AuthGuard], data: { roles: [Ruoli.amministratore] }},
  {path:'logout', component : LogoutComponent},
  {path:'forbidden', component : ForbiddenComponent},
  {path:'**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
