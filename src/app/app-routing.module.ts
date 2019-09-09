import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Components */
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InternalServerComponent } from './components/internal-server/internal-server.component';

/** childrens */
import { TestComponent } from './components/pages/test/test.component';
import { TestAddComponent } from './components/pages/test-add/test-add.component';

/** Guards */
import { LoginGuard } from './guards/login.guard';
import { DashboardGuard } from './guards/dashboard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [DashboardGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard],
    children: [
    { path: 'test', component: TestComponent },
    { path: 'test/add', component: TestAddComponent},
    { path: '', redirectTo: '/dashboard/test', pathMatch: 'full'},
  ]},
  { path: 'settings', component: SettingsComponent, canActivate: [LoginGuard]},
  { path: 'error-internal-server', component: InternalServerComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
