import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecreaderPageComponent } from './specreader-page/specreader-page.component';
import { EditOnApispecComponent } from './edit-on-apispec/edit-on-apispec.component';
import { UploadRoutefilesComponent } from './upload-routefiles/upload-routefiles.component';

const routes: Routes = [
  {
    path: 'reader',
    component: SpecreaderPageComponent
  },
  {
    path: 'edit',
    component: EditOnApispecComponent
  },
  {
    path: 'upload',
    component: UploadRoutefilesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
