import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Account } from '../../models/account.model';
import { TransactionAccountService } from '../../services/transaction-account.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})

export class TransferComponent implements OnInit {
  accounts: Account[];
  transferForm: FormGroup;
  warnings = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private acc: TransactionAccountService,
  ) { }

  /**
   * Convenience method for for controls.
   */
  get f() { return this.transferForm.controls; }

  /**
   * Get a list of accounts excluding the chosen source account as it is
   * pointless to transfer to and from the same account.
   */
  get options() {
    return this.accounts ? this.accounts.filter((eachElem, index) => {
      return this.f.sourceAccount.value != index;
    }) : null;
  }

  /**
   * Return the account based on the chosen value in the form, it is only an
   * index. If that is not set just return null.
   */
  get source() {
    return this.accounts ? this.accounts[this.f.sourceAccount.value] : null;
  }

  get dest() {
    return this.options ? this.options[this.f.destAccount.value] : null;
  }

  ngOnInit() {
    this.acc.getUserAccounts(this.auth.getAccounts()).subscribe(accounts => {
      this.accounts = accounts as Array<Account>;
    });

    this.transferForm = this.formBuilder.group({
      sourceAccount: ['', [Validators.required]],
      destAccount: ['', [Validators.required]],
      dollars: ['', [Validators.min(0)]],
      cents: ['', [Validators.min(0), Validators.max(99)]],
    });
  }

  /**
   * Transfer money from one account to another by sending two Http requests
   * to the backend. Setting the new balance for the source account and dest
   * account. This could have been done as one request, but it always requires
   * two calls to the database.
   */
  async transfer() {
    if (this.transferForm.invalid || (!this.f.dollars.value && !this.f.cents.value)) {
      this.warnings = true;
      return;
    } else {
      this.warnings = false;
      const source = new Account(this.accounts[this.f.sourceAccount.value]);
      const dest = new Account(this.options[this.f.destAccount.value]);
      // The '' before concant forces the values to be treated as strings.
      const amount = +''.concat(this.f.dollars.value, this.f.cents.value || '00');
      if (source.transfer(dest, amount)) {
        console.log(source);
        console.log(dest);
        // Using a getter 'reserve' as balance is private.
        const res1 = await this.acc.update(source.id, { balance: source.reserve } );
        const res2 = await this.acc.update(dest.id, { balance: dest.reserve } );
        location.reload();
      } else {
        this.warnings = true;
      }
    }
  }

  close() {
    this.warnings = false;
  }

}
