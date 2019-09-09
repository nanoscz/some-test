import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public tests: any;
  public baseUrl: string; 
  constructor(public testService: TestService, public router: Router) { }
  async ngOnInit() {
    this.baseUrl = this.router.url;
    this.tests = await this.testService.findAll().catch(this.handleError.bind(this));
  }

  toRegisterTest() {
    this.router.navigate([`${this.baseUrl}/add`]);
  }

  handleError(error) {
    console.error(error);
  }
}
