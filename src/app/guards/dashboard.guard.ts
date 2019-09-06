import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    public router: Router,
    public authService: AuthService
    ) {}
  canActivate(): boolean {
    if (this.authService.isLogged()) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
