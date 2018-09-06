import { Component, OnInit, Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {UserArray} from './UserArr';
import {UserData} from '../userVal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 constructor() {}

  ngOnInit() {
  }

  Submit(username:string,password:string): void{
	for (let eachuser of UserData){
		if(username === eachuser.username && password === eachuser.password){
			  window.location.href = 'https://www.rmit.edu.au/'; //Later link
		}
	}
/* 	UserData.push({
	username: reg1, password: reg2});
	console.log(UserData); */
  }
}
