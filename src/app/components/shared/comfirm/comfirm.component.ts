import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-comfirm',
  templateUrl: './comfirm.component.html',
  styleUrls: ['./comfirm.component.scss']
})
export class ComfirmComponent implements OnInit {
  public query: string;
  constructor(
    public dialogRef: MatDialogRef<ComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.query = data.query;
  }

  ngOnInit() {
  }

  close(remove) {
    console.log(remove);
    this.dialogRef.close(remove);
  }

  remove(remove) {
    this.close(remove);
  }
}
