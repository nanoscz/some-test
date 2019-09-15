import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  baseUrl = '/v1/questionnaire';
  constructor(public http: HttpClient) { }

  findOne(testId: number) {
    return this.http.get(`${this.baseUrl}/${testId}`)
      .toPromise()
      .catch(this.handleError);
  }

  save(questionnaire: any) {
    return this.http.post(this.baseUrl, questionnaire)
      .toPromise()
      .catch(this.handleError);
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err.error);
  }

}
