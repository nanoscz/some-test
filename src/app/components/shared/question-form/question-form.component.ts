import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input() questionForm: FormGroup;
  @Input() numberQuestion: number;

  constructor() { }

  ngOnInit() {
  }

  changeInput(event) {
    const value = parseInt(event.target.value, 10);
    console.log(value);
  }
}
