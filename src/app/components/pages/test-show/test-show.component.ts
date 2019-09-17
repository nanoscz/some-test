import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material';

import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { TestService } from 'src/app/services/test.service';
import { QuestionService } from 'src/app/services/question.service';

import { DialogComponent } from '../../shared/dialog/dialog.component';

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
    public dialog: MatDialog,
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

  toDeteleTest() {
    this.testService.delete(this.testId)
      .then(() => {
        this.toBack();
      })
      .catch(this.handleError);
  }

  toEditTest(name: string, description: string, type: string) {
    const test = {
      id: this.testId,
      name,
      description,
      type
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {test, entity: 'test'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.test.test.name = result.name;
      this.test.test.description = result.description;
      console.log('The dialog was closed');
    });
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
