import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  /*
   * This function determines whether a given user is authenricated by
   * using the authentication service predefined loggedOn function. This
   * is seperated into it's own class so it can implement the CanActivate
   * and be used as a guard for routes.
   */
  canActivate() {
    if (!this.auth.loggedOn()) {
      // Flush the token as it is invalid.
      localStorage.removeItem('sharelion-token');
      // Navigate to the login page.
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
