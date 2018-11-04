import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { TransactionAccountService } from '../../services/transaction-account.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  details: User;

  constructor(private auth: AuthenticationService) { }

   ngOnInit() {
    this.auth.dashboard().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

}
