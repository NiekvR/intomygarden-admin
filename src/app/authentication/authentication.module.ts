import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {SharedModule} from "../shared/shared.module";
import { SignupComponent } from './signup/signup.component';
import { PasswordComponent } from './password/password.component';



@NgModule({
  declarations: [LoginComponent, SignupComponent, PasswordComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
