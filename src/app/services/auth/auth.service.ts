import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { User } from '../../types/user';
import { Creds } from '../../types/creds';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  user: User;

  register(creds: Creds) {
    return this.http.post(environment.loginUrl, creds);
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }
}
