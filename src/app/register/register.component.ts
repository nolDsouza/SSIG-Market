import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 	user: string;
	pass: string;
	first: string;
	last: string;
	email: string; 
	change: number;
  constructor() { }

  ngOnInit() {
  }
  
  register(username,firstname,lastname,email,password,passwordconfirm){
	  if(password === passwordconfirm){
		  this.user = username;
		  this.pass = password;
		  this.first = firstname;
		  this.last = lastname;
		  this.email = email;
		  
		  console.log(this.user,this.pass,this.first,this.last,this.email);
	  }
  }
  
  checker(password,password2){
	  if(password === password2){
		  this.change = 1;
		  console.log("YES");
	  }else{
		  this.change=0;
	  }
  }	

}
