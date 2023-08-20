import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecreaderPageComponent } from './specreader-page/specreader-page.component';
import { EditOnApispecComponent } from './edit-on-apispec/edit-on-apispec.component';
import { UploadRoutefilesComponent } from './upload-routefiles/upload-routefiles.component';
import { AuthGuard } from '../utility/app.guard';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path: 'reader',
    component: SpecreaderPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: EditOnApispecComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
