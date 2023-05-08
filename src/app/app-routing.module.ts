import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './home/header/header.component';

const routes: Routes = [{
  path: 'spec',
  loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
},
{
  path:'head',
  component: HeaderComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
