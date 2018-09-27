import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/user.model';
import { Account } from '../../models/account.model';
import { AuthenticationService } from '../../services/authentication.service';
import { AccountBlueprint, TransactionAccountService } from '../../services/transaction-account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  accounts: Account[];
  // used to determine when to render html
  newAccountPending = false;
  newAccountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private accService: TransactionAccountService
  ) {
    this.accounts = [];
  }


  ngOnInit() {
    this.user = this.auth.getUser() as User;

    this.newAccountForm = this.formBuilder.group({
      accountName: ['', [Validators.required, Validators.minLength(3)]]
    });

    //    const _id = this.auth.getUser().accounts.pop();
    for (const _id of this.auth.getAccounts()) {
      // subscribe to get request as it is not returned immediately.
      this.accService.getTransactionAccountById(_id).subscribe((res) => {
          this.accounts.push(res as Account);
        },
          err => {
          console.log(err);
        }
      );
    }
  }

  openForm() {
    this.newAccountPending = true;
  }

  closeForm() {
    this.newAccountPending = false;
  }

  createAccount() {
    const blueprint: AccountBlueprint = this.newAccountForm.value;
    this.accService.createTransactionAccount(this.user._id, blueprint).subscribe((res) => {
      this.auth.setAccounts(this.auth.getAccounts().concat(res as string));
      location.reload();
    },
      err => {
        console.log('debug2', err);
      }
    );
  }

}
