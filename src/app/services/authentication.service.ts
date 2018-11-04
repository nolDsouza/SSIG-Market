import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  username: string;
  firstname: string;
  lastname: string;
  balance: number;
  accounts: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('sharelion-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('sharelion-token');
    }
    return this.token;
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'dashboard',
  user?: TokenPayload): Observable<any> {
    const api = 'http://localhost:4000';
    let base;

    if (method === 'post') {
      base = this.http.post(`${api}/${type}`, user);
    } else {
      console.log(this.getToken());
      base = this.http.get(`${api}/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const req = base.pipe(map((data: TokenResponse) => {
      if (data.token) {
        // Save the user data in local storage.
        this.saveToken(data.token);
        // Save the accounts in session storage.
        this.setAccounts(this.getUser().accounts);
      }
      return data;
    }));
    return req;
  }

  public getUser(): User {
    const token = this.getToken();
    let payload;

    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }
    return null;
  }

  /**
   * Storing account information in the session because it is subject to change.
   */
  public getAccounts(): string[] {
    // Store in session if not available, (happens on first call).
    if (sessionStorage.getItem('accounts') === null) {
      this.setAccounts(this.getUser().accounts);
    }
    return JSON.parse(sessionStorage.getItem('accounts'));
  }

  public setAccounts(accounts: string[]): void {
    sessionStorage.setItem('accounts', JSON.stringify(accounts));
  }

  public loggedOn(): boolean {
    const user = this.getUser();

    if (!user) {
      return false;
    }
    return user.exp > Date.now() / 1000;
  }

  // Calling of the API.
  public register(userInfo: TokenPayload): Observable<any> {
    return this.request('post', 'register', userInfo);
  }

  public login(userInfo: TokenPayload): Observable<any> {
    return this.request('post', 'login', userInfo);
  }

  public dashboard(): Observable<any> {
    return this.request('get', 'dashboard');
  }
}
