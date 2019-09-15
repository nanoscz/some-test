import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = '/v1/questions';
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

  findByAnswers(id: number) {
    return this.http.get(`${this.baseUrl}/${id}/answers`)
      .toPromise()
      .catch(this.handleError);
  }

  save(question: any) {
    return this.http.post(this.baseUrl, question)
      .toPromise()
      .catch(this.handleError);
  }

  update(question: any, id: number) {
    return this.http.patch(`${this.baseUrl}/${id}`, question)
      .toPromise()
      .catch(this.handleError);
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
