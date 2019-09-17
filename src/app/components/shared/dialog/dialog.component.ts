import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data.entity === 'test') {
      this.form = this.fb.group({
        name: [this.data.test.name, [Validators.required]],
        description: [this.data.test.description, [Validators.required]],
        type: [this.data.test.type, [Validators.required]],
      });
    }
  }

  getErrorMessage(type) {
    return this.form.controls[type].hasError('required') ? 'You must enter a value' : '';
  }

  async onEdit() {
    if (this.form.valid) {
      await this.testService.update(this.data.test.id, this.form.value).catch(this.handleError);
      this.close();
    } else {
      console.log('form not valid.');
    }
  }

  close() {
    this.dialogRef.close(this.form.value);
  }

  handleError(err: any): Promise<any> {
    return Promise.reject(err);
  }

}
