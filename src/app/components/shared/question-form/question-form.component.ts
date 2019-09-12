import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input() questions: FormGroup;
  @Input() numberQuestion: number;
  @Output() deleteQuestion = new EventEmitter();

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addAnswers() {
    const answers = <FormArray>this.questions.controls['answers'];
    const newGroup = this.fb.group({
      text: ['', [Validators.required]],
      points: [0, [Validators.required]],
      question_id: null
    });
    answers.push(newGroup);
  }

  removeAnswers(index) {
    const answers = <FormArray>this.questions.controls['answers'];
    answers.removeAt(index);
    this.showMessage(`Answers #${index + 1} has been deleted.`, 2000);
  }

  clearQuestion(): void {
    this.deleteQuestion.emit({ index: this.numberQuestion });
    this.showMessage(`Question #${this.numberQuestion + 1} has been deleted.`, 2000);
  }

  showMessage(msg: string, duration: number) {
    this._snackBar.open(msg, null, { duration });
  }

  getErrorMessage(type): string {
    return this.questions.controls[type].hasError('required') ? 'You must enter a value' : '';
  }
}
