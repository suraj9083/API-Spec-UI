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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KeycRegiComponent } from './keyc-regi/keyc-regi.component';
import { MatFormFieldModule } from'@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar'


@NgModule({
  declarations: [
    RegisterComponent,
    MfaComponent,
    LoginComponent,
    KeycRegiComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
    HomeModule
  ]
})
export class UserManagementModule { }
