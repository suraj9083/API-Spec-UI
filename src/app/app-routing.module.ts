import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './home/header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'spec',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: '',
    loadChildren: () => import('./user-management/user-management.module').then(mod => mod.UserManagementModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
