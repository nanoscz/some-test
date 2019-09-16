import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-show',
  templateUrl: './test-show.component.html',
  styleUrls: ['./test-show.component.scss']
})
export class TestShowComponent implements OnInit {
  public test: any = null;
  public testId: number;
  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private testService: TestService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(async params => {
      this.testId = params.id;
      this.test = await this.questionnaireService.findOne(this.testId).catch(this.handleError);
      console.log(this.test);
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

  handleError(error) {
    console.error(error);
  }

}
