import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.scss']
})
export class TestAddComponent implements OnInit {
  public answers = {
    text: '',
    point: 0,
    question_id: null
  };

  public questions = {
    query: '',
    multiple: false
  };

  form: FormGroup;

  constructor(public router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['normal', [Validators.required]],
      questions: this.fb.array([])
    });

    this.addQuestion();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const formData = this.form.value;
    console.log(formData);
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
}
