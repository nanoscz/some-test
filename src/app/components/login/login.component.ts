import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;
  form: FormGroup;

  constructor(
      private router: Router,
      public userService: UserService,
      public localStorageService: LocalStorageService
    ) {
    this.form = new FormGroup({
      username: new FormControl('fer', [Validators.required, Validators.min(4)]),
      password: new FormControl('123123', [Validators.required, Validators.min(4)]),
    });
   }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.userService.login(formValue.username, formValue.password)
        .then((res: any) => {
          if (!res) {
            this.error = 'Username or Password invalid.';
          } else {
            this.localStorageService.set('account', JSON.stringify(res.user));
            this.localStorageService.set('token', JSON.stringify(res.token));
            this.router.navigate(['/dashboard']);
          }
        })
        .catch(err => console.log(err));
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
