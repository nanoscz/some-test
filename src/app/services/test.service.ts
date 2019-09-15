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

  findOne(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * You must send a Test object
   * @param Test Object Test
   * @returns Promise Promise Object
   */
  save(test: any): Promise<any> {
    return this.http.post(this.baseUrl, test)
      .toPromise()
      .catch(this.handleError);
  }

  update(test: any, id: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, test);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .toPromise()
      .catch(this.handleError);
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }
}
