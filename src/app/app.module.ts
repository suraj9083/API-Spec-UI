import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


import { ReactiveFormsModule } from '@angular/forms';
// import {
//   MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule,
//   MatInputModule, MatSnackBarModule, MatTableModule, MatPaginatorModule,
//   MatSortModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatTooltipModule,
//   MatTabsModule, MatDatepickerModule, MatRadioModule, MatExpansionModule
// } from '@angular/material';

import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeModule } from './home/home.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    DragDropModule,
    // FormlyBootstrapModule,
    // FormlyModule.forRoot(),
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
