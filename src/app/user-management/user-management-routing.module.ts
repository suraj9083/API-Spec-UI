import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { MfaComponent } from './mfa/mfa.component';
import { LoginComponent } from './login/login.component';
import { KeycRegiComponent } from './keyc-regi/keyc-regi.component';
import { AuthGuard } from '../utility/app.guard';

const routes: Routes = [
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  {
    path: '',
    component: LoginComponent
  },
  // {
  //   path: 'mfa',
  //   component: MfaComponent
  // },
  // {
  //   path: 'regi',
  //   component: KeycRegiComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
