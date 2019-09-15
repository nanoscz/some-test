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

  findOne(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(this.handleError);
  }

  register(user: User) {
    return this.http.post(this.baseUrl, user)
      .toPromise()
      .catch(this.handleError);
  }

  update(id: number, user: any) {
    this.http.patch(`${this.baseUrl}/${id}`, user)
      .toPromise()
      .catch(this.handleError);
  }

  delete(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(this.handleError);
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }

}
