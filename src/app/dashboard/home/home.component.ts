import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  user: User;
  companies: string[];
  names: string[];
  values: number[];
  constructor(private auth: AuthenticationService) { }


  ngOnInit() {
    this.user = this.auth.getUser() as User;

    this.companies = [
      'NAB',
      'MQG',
      'COM',
      'DOM',
      'ABC',
      'DMT',
      'ASD',
      'GHJ',
      'YUI',
      'POI'
    ];

    this.names = [
      'username0',
      'username1',
      'username2',
      'username3',
      'username4',
      'username5',
      'username6',
      'username7',
      'username8',
      'username9'
    ];

    this.values = [
      12, 324, 635, 2345, 64, 77, 0, 2342, 33, 55
    ];
  }

  range() {
    // const _i = 10;
    const arr = Array.from(Array(10).keys());
    return arr;
  }
}
