import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SpecreaderPageComponent } from './specreader-page/specreader-page.component';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EditOnApispecComponent } from './edit-on-apispec/edit-on-apispec.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SpecreaderPageComponent,
    PopupComponent,
    EditOnApispecComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule
  ]
})
export class HomeModule { }
