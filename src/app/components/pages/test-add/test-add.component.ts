import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

/** Services */
import { TestService } from 'src/app/services/test.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.scss']
})
export class TestAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private testService: TestService,
    private questionService: QuestionService,
    private quesionnaireService: QuestionnaireService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['normal', [Validators.required]],
      questions: this.fb.array([])
    });
  }

  async onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    const formData = this.form.value;
    const { name, type, description, questions } = formData;
    if (!questions.length) {
      this.showMessage('You must add questions ot the questionnaire.', 2000);
      return;
    }
    const user_id = this.getUserId();
    const test = { name, description, type, user_id };
    const response = await this.testService.save(test).catch(this.handleError);
    const testId = response[0].id;
    const questionsPromise = [];
    for (const question of questions) {
      if (!question.answers.length) {
        this.showMessage('You must add answers to the questions.', 2000);
        questionsPromise.length = 0;
        return;
      }
      const { query, multiple, answers } = question;
      const objQuestion = { query, multiple, answers: JSON.stringify(answers) };
      questionsPromise.push(this.questionService.save(objQuestion));
    }
    Promise.all(questionsPromise).then(async responseQuestions => {
      const arrQuestionnaire = [];
      for (const question of responseQuestions) {
        arrQuestionnaire.push({
          testId,
          questionId: question.id
        });
      }
      const questionnaire = JSON.stringify(arrQuestionnaire);
      await this.quesionnaireService.save({ questionnaire }).catch(this.handleError);
      this.showMessage('Questionnaire created correctly.', 2500);
      this.toBack();
    });
  }

  getUserId() {
    return 1;
  }

  showMessage(msg: string, duration: number) {
    this._snackBar.open(msg, null, { duration });
  }

  getErrorMessage(type) {
    return this.form.controls[type].hasError('required') ? 'You must enter a value' : '';
  }

  deleteQuestion($event) {
    const index = $event.index;
    const questions = <FormArray>this.form.controls['questions'];
    questions.removeAt(index);
  }

  addQuestion() {
    const questions = <FormArray>this.form.controls['questions'];
    const newGroup = this.fb.group({
      query: ['', [Validators.required]],
      multiple: [false],
      answers: this.fb.array([])
    });
    questions.push(newGroup);
  }

  toBack() {
    this.router.navigate(['/dashboard/test']);
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err);
  }

}

