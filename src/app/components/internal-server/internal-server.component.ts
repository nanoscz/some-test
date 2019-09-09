import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.scss']
})
export class InternalServerComponent implements OnInit {
  public message: string;
  constructor(private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activateRouter.params.subscribe((params: any) => {
      this.message = params.error;
    });
  }

}
