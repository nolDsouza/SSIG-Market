import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginService {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate() {
    if (this.auth.loggedOn()) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}
