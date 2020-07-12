import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

import { Creds } from '../../types/creds';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public authService: AuthService, public router: Router) {}
  title = 'Login';

  login(creds: Creds) {
    this.authService.login(creds).subscribe({
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
}
