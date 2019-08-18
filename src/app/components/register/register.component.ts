import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string;
  form:  FormGroup;
  user: {
    username: '',
    password: '',
    email: '',
    ci: '',
    type: 'normal'
  }
  constructor(private router: Router) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.min(4)]),
      password: new FormControl('', [Validators.required, Validators.min(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      ci: new FormControl('', [Validators.required, Validators.max(9)]),
      type: new FormControl('normal', [Validators.required])
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      console.log("form", this.form.value)
      this.error = '';
      this.onLogin();
    } else {
      this.error = 'Error in register.'
      console.log("Error:", this.form)
    }
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
}
