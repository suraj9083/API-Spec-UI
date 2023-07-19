import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MfaComponent } from './mfa/mfa.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    RegisterComponent,
    MfaComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HomeModule
  ]
})
export class UserManagementModule { }
