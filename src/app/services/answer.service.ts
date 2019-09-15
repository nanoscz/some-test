import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  baseUrl = '/v1/answers';
  constructor(public http: HttpClient) { }

  findAll() {
    return this.http.get(this.baseUrl)
      .toPromise()
      .catch(this.handleError);
  }

  save(answer: any) {
    return this.http.post(this.baseUrl, answer)
      .toPromise()
      .catch(this.handleError);
  }

  update(answer: any, id: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, answer);
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
