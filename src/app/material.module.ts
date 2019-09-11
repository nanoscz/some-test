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
  MatCheckboxModule
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
  MatCheckboxModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
