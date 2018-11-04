import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/user.model';
import { Account } from '../../models/account.model';
import { AuthenticationService } from '../../services/authentication.service';
import { AccountBlueprint, TransactionAccountService } from '../../services/transaction-account.service';

import { TransferComponent } from '../transfer/transfer.component';

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
  }


  ngOnInit() {
    this.user = this.auth.getUser() as User;

    this.newAccountForm = this.formBuilder.group({
      accountName: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.accService.getUserAccounts(this.auth.getAccounts()).subscribe(accounts => {
      this.accounts = accounts as Array<Account>;
    });
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

  async deleteAccount(id) {
    await this.accService.delete(id);
    location.reload();
  }

}
