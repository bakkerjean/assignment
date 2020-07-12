import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';

import { Creds } from '../../types/creds';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    public authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}
  title = 'Register';
  formElements = ['firstName', 'lastName', 'email', 'password'];

  formGroup: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  onSubmit(creds: Creds) {
    this.authService.register(creds).subscribe({
      next: () => {
        this.authService.setUser({
          firstName: creds.firstName,
          lastName: creds.lastName,
          email: creds.email,
        });
        this.router.navigate(['']);
      },
      error: (error) => console.log(error),
    });
  }

  validate(element) {
    const e = this.formGroup.get(element);
    if (e.hasError('required')) {
      return 'Required';
    }
    if (e.hasError('email')) {
      return 'Must be a valid email format';
    }
    if (e.hasError('password')) {
      return 'Min 8 chars, 1 uppercase and 1 lowercase letter, may not contain first or last name';
    }
  }

  passwordValidator = (control: FormControl) => {
    const password = control.value;
    // (min 8 chars)(min 1 lowercase)(min 1 uppercase)
    const regex = new RegExp('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])');
    if (!regex.test(password)) {
      return {
        password,
      };
    }
    // may not contain first or last name
    if (
      this.formGroup.controls.firstName.value.length &&
      this.formGroup.controls.firstName.value.length &&
      (password.includes(this.formGroup.controls.firstName.value) ||
        password.includes(this.formGroup.controls.lastName.value))
    ) {
      return {
        password,
      };
    }
    return null;
  };

  emailValidator = (control: FormControl) => {
    const email = control.value;
    // email verification (see readme)
    const regex = new RegExp(
      '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
    );
    if (!regex.test(email)) {
      return {
        email,
      };
    }
    return null;
  };
}
