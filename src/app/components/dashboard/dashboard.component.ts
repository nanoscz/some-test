import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public tests: any;
  constructor(public testService: TestService) { }

  async ngOnInit() {
    this.tests = await this.testService.findAll().catch(this.handleError.bind(this));
  }

  handleError(error) {
    console.error(error);
  }

}

