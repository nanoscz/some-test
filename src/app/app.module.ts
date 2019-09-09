import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

/** Angular Material */
import { MaterialModule  } from './material.module';

/** Components */
import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RegisterComponent } from './components/register/register.component';

/** Services */
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { LoginGuard } from './guards/login.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InternalServerComponent } from './components/internal-server/internal-server.component';
import { TestComponent } from './components/pages/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    DashboardComponent,
    SettingsComponent,
    RegisterComponent,
    NotFoundComponent,
    InternalServerComponent,
    TestComponent
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    AuthService,
    LocalStorageService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
