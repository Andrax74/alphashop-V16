import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RegistrazioneComponent } from './pages/registrazione/registrazione.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrazioneComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
  ]
})
export class LoginModule { }
