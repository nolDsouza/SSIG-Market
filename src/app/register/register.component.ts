import { Component, OnInit } from '@angular/core';
import {UserArray} from '../login/UserArr';
import {UserData} from '../userVal';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
change: number;
validity: boolean;
 constructor() { }

  ngOnInit() {
  }
  
  register(username,firstname,lastname,email,password,passwordconfirm){
	  if(password === passwordconfirm){
		  for (let current of UserData){
			  if (username === current.username || email === current.email){
				  this.validity = false;
			  }
		  }
		  if (this.validity != false){
			 UserData.push({username: username, password: password, firstname: firstname, lastname: lastname, email:email});
		  }
	  }
	  console.log(UserData);
  }
  
  checker(password,password2){
	  if(password === password2){
		  this.change = 1;
	  }else{
		  this.change=0;
	  }
  }	

}
