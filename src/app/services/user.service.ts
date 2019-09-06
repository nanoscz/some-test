import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = '/v1/users';
  constructor(public http: HttpClient) { }

  findAll() {
    return this.http.get(this.baseUrl)
      .toPromise()
      .catch(this.handleError);
  }

  findOne(uuid: string) {
    return this.http.get(`${this.baseUrl}/${uuid}`)
      .toPromise()
      .catch(this.handleError);
  }

  register(user: User) {
    return this.http.post(this.baseUrl, user)
      .toPromise()
      .catch(this.handleError);
  }

  update(uuid: string, user: any) {
    this.http.patch(`${this.baseUrl}/${uuid}`, user)
      .toPromise()
      .catch(this.handleError);
  }

  delete(uuid: string) {
    this.http.delete(`${this.baseUrl}/${uuid}`)
      .toPromise()
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
