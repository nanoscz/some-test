import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  baseUrl = '/v1/tests';
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

  save(test: any) {
    return this.http.post(this.baseUrl, test)
      .toPromise()
      .catch(this.handleError);
  }

  update(test: any, uuid: string) {
    return this.http.patch(`${this.baseUrl}/${uuid}`, test);
  }

  delete(uuid: string) {
    return this.http.delete(`${this.baseUrl}/${uuid}`)
      .toPromise()
      .catch(this.handleError);
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }
}
