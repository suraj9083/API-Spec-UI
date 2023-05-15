import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { MfaComponent } from './mfa/mfa.component';

const routes: Routes = [
  {
    path: 'regi',
    component: RegisterComponent
  },
  {
    path: 'mfa',
    component: MfaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
