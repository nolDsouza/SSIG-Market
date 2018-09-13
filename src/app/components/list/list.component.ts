import { Component, OnInit } from '@angular/core';
import { TransactionAccountService } from '../../transaction-account.service';

import { AuthenticationService } from '../../authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  user: User;

  constructor(private auth: AuthenticationService) { }

   ngOnInit() {
    this.auth.dashboard().subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
    });
  }

}
