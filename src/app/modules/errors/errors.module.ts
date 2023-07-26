import { CommonModule } from '@angular/common';
import { ErrorComponent } from './pages/error/error.component';
import { NgModule } from '@angular/core';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

@NgModule({
  declarations: [
    ErrorComponent,
    ForbiddenComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorsModule { }
