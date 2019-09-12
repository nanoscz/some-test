import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl: 'v1/questions';
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

  save(question: any) {
    return this.http.post(this.baseUrl, question)
      .toPromise()
      .catch(this.handleError);
  }

  update(question: any, uuid: string) {
    return this.http.patch(`${this.baseUrl}/${uuid}`, question)
      .toPromise()
      .catch(this.handleError);
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
