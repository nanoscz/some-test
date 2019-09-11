import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input() questionForm: FormGroup;
  @Input() numberQuestion: number;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    const answersForm = <FormArray>this.questionForm.controls['answersForm'];
    for (let index = 0; index < 3; index++) {
      const newGroup = this.fb.group({
        text: ['', [Validators.required]],
        points: [0, [Validators.required]],
        question_id: null
      });
      answersForm.push(newGroup);
    }
  }
}
