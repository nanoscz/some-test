import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { TestService } from 'src/app/services/test.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-test-show',
  templateUrl: './test-show.component.html',
  styleUrls: ['./test-show.component.scss']
})
export class TestShowComponent implements OnInit {
  public test: any = null;
  public testId: number = null;
  public answers: any = [];
  public step = 0;
  public countQuestion = 0;
  constructor(
    private router: Router,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private questionnaireService: QuestionnaireService
  ) {
    this.activatedRoute.params.subscribe(async params => {
      this.testId = params.id;
      this.test = await this.questionnaireService.findOne(this.testId).catch(this.handleError);
      this.countQuestion = this.test.questionnaire.length - 1;
    });
  }

  ngOnInit() {
  }

  toDetele() {
    this.testService.delete(this.testId)
      .then(() => {
        this.toBack();
      })
      .catch(this.handleError);
  }

  toBack() {
    this.router.navigate(['/dashboard/test']);
  }

  async setStep(index: number, id: number) {
    this.step = index;
    this.answers = await this.questionService.findByAnswers(id).catch(this.handleError);
    console.log(this.answers);
  }

  changeAnswers(id: number) {
    console.log(id);
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  handleError(error) {
    console.error(error);
  }

}
