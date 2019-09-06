import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/v1/login';
  constructor(public http: HttpClient, public localStorage: LocalStorageService) { }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl, {username, password})
      .toPromise()
      .catch(this.handleError);
  }

  isLogged() {
    const token = this.localStorage.get('token');
    if (!token) {
      return false;
    }
    return true;
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }
}
