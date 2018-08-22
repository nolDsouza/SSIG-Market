import { Component, OnInit, Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user = "Test";
pass = "$Test123";
  constructor() { }

  ngOnInit() {
	  }

  Submit(username:string,password:string): void{
  
	  if(username === this.user && password === this.pass){
		  window.location.href = 'https://www.rmit.edu.au/'; //Later link
	  }
  }
}
