import { AvatarComponent } from './avatar/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification/notification/notification.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    JumbotronComponent,
    NotificationComponent,
    AvatarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    JumbotronComponent,
    SpinnerComponent
  ]
})
export class CoreModule { }
