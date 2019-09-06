import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;
  form: FormGroup;

  constructor(private router: Router) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.min(4)]),
      password: new FormControl('', [Validators.required, Validators.min(4)]),
    });
   }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      console.log('form', this.form.value);
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Username or Password invalid.';
      console.log('Error:', this.form);
    }
  }

  onRegister() {
    console.log('Register..');
    this.router.navigate(['/register']);
  }
}
