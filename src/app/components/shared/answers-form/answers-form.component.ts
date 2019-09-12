import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-answers-form',
  templateUrl: './answers-form.component.html',
  styleUrls: ['./answers-form.component.scss']
})
export class AnswersFormComponent implements OnInit {

  @Input() answers: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  getErrorMessage(type) {
    return this.answers.controls[type].hasError('required') ? 'You must enter a value' : '';
  }
}
