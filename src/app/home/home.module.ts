import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './header/header.component';
import { UploadRoutefilesComponent } from './upload-routefiles/upload-routefiles.component';
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  declarations: [
    SpecreaderPageComponent,
    PopupComponent,
    EditOnApispecComponent,
    HeaderComponent,
    UploadRoutefilesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    HeaderComponent,
    PopupComponent
  ]
})
export class HomeModule { }
