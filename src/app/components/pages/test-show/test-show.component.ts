import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuestionnaireService } from 'src/app/services/questionnaire.service';

@Component({
  selector: 'app-test-show',
  templateUrl: './test-show.component.html',
  styleUrls: ['./test-show.component.scss']
})
export class TestShowComponent implements OnInit {
  public test: any = null;
  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(async params => {
      this.test = await this.questionnaireService.findOne(params.uuid).catch(this.handleError);
      console.log(this.test);
    });
  }

  ngOnInit() {
  }

  toBack() {
    this.router.navigate(['/dashboard/test']);
  }

  handleError(error) {
    console.error(error);
  }

}
