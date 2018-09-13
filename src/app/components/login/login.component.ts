import { Component, OnInit, Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService, TokenPayload } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  incorrect = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userfield: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid === true) {
      // Saving the server the hassle of dealing incorrect password if too small
      this.incorrect = true;
      return;
    }

    this.auth.login(this.loginForm.value as TokenPayload).subscribe(() => {
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      if (err.status === 401) {
        this.incorrect = true;
      }
      console.error(err);
    });
  }
}
