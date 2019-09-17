import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatSnackBar } from '@angular/material';

import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { TestService } from 'src/app/services/test.service';
import { QuestionService } from 'src/app/services/question.service';

import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ComfirmComponent } from '../../shared/comfirm/comfirm.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  public formQuestion: FormGroup;
  public submitAddQuesiton = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private questionnaireService: QuestionnaireService
  ) {
    this.activatedRoute.params.subscribe(async params => {
      this.testId = params.id;
      this.test = await this.questionnaireService.findOne(this.testId).catch(this.handleError);
      this.countQuestion = this.test.questionnaire.length - 1;
      console.log(this.test.questionnaire);
    });
  }

  ngOnInit() {
    this.formQuestion = this.fb.group({
      query: ['', [Validators.required]],
      multiple: [false],
      answers: this.fb.array([])
    });
  }

  async toAddQuestion() {
    this.formQuestion.markAllAsTouched();
    if (!this.formQuestion.valid) {
      return;
    }
    const objQuestion = this.formQuestion.value;
    objQuestion.answers = JSON.stringify(objQuestion.answers);
    const question = await this.questionService.save(objQuestion).catch(this.handleError);
    const questionnaire: Questionnaire = {
      testId: this.testId,
      questionId: question.id
    };
    await this.questionnaireService.save({ questionnaire: JSON.stringify([questionnaire]) })
      .catch(this.handleError);
    delete question.answers;
    this.test.questionnaire.push({ question });
    this.nextStep();
  }

  toDeteleTest() {
    const dialogRef = this.dialog.open(ComfirmComponent, {
      width: '400px',
      data: { query: 'Are you sure to eliminate the test?' }
    });
    dialogRef.afterClosed().subscribe(async remove => {
      if (remove) {
        await this.testService.delete(this.testId).catch(this.handleError);
        this.showMessage('The test has been successfully deleted.');
        this.toBack();
      }
      console.log('The dialog was closed');
    });
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
      data: { test, entity: 'test' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.test.test.name = result.name;
      this.test.test.description = result.description;
      console.log('The dialog was closed');
    });
  }

  toDeteleQuestion(id: number, index: number) {
    const dialogRef = this.dialog.open(ComfirmComponent, {
      width: '400px',
      data: { query: 'Are you sure to eliminate the question?' }
    });
    dialogRef.afterClosed().subscribe(async remove => {
      if (remove) {
        await this.questionService.delete(id).catch(this.handleError);
        this.test.questionnaire.splice(index, 1);
        this.showMessage('The test has been successfully deleted.');
      }
      console.log('The dialog was closed');
    });
  }

  toEditQuestion(question) {
    console.log(question);
  }

  toBack() {
    this.router.navigate(['/dashboard/test']);
  }

  async setStep(index: number, id: number) {
    this.step = index;
    this.answers = await this.questionService.findByAnswers(id).catch(this.handleError);
    // console.log(this.answers);
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

  showMessage(msg: string, duration: number = 2000) {
    this._snackBar.open(msg, null, { duration });
  }

  handleError(error) {
    console.error(error);
  }

}

export interface Questionnaire {
  testId: number;
  questionId: number;
}
