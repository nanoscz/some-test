import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error: string;
  form: FormGroup;
  constructor(
    private router: Router,
    public userService: UserService
  ) {
    this.form = new FormGroup({
      username: new FormControl('nanoscz', [Validators.required]),
      fullname: new FormControl('Fernando Castillo Torrico', [Validators.required]),
      password: new FormControl('123123', [Validators.required]),
      email: new FormControl('fernandocto.scz@gmail.com', [Validators.required, Validators.email]),
      ci: new FormControl('12345678', [Validators.required])
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const user = new User(
        formValue.username,
        formValue.fullname,
        formValue.password,
        formValue.email,
        formValue.ci
      );
      this.userService.register(user)
        .then(() => {
          this.error = '';
          this.onLogin();
        })
        .catch(err => console.log(err));
    } else {
      this.error = 'Error in register.';
      console.log('Error:', this.form);
    }
  }
  onLogin() {
    this.router.navigate(['/login']);
  }
}
