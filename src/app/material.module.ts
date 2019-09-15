import { NgModule } from '@angular/core';

import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatSnackBarModule,
  MatRippleModule,
  MatRadioModule
 } from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  LayoutModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatSnackBarModule,
  MatRippleModule,
  MatRadioModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
