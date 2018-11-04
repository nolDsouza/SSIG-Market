import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from '../../models/company.model';
import { User } from '../../models/user.model';
import { Account } from '../../models/account.model';
import { CompanyService } from '../../services/company.service';
import { ShareService } from '../../services/share.service';
import { Transaction, TransactionPayload  } from '../../models/transaction.model';
import { TransactionAccountService } from '../../services/transaction-account.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-share-summary',
  templateUrl: './share-summary.component.html',
  styleUrls: ['./share-summary.component.css']
})
export class ShareSummaryComponent implements OnInit {
  // same idea as buying pipeline, do it on one page.
  private summary = 0;
  private details = 1;
  private confirmation = 2;
  private checkout = 3;
  private pipeline = this.summary;
  private company: Company;
  private user: User;
  private sharePrice: any;
  private amount: number;
  private sellForm: FormGroup;
  private accounts: Account[];
  private certificate;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private companySearch: CompanyService,
    private share: ShareService,
    private auth: AuthenticationService,
    private middleMan: TransactionAccountService,
  ) { }

  get f() { return this.sellForm.controls; }

  get selected() {
    return this.accounts ? this.accounts[this.f.account.value] : null;
  }

  get total() { return this.sharePrice * this.f.quantity.value; }

  /**
   * Using this function to validate the input as Validators weren't working.
   */
  get validated_input() {
    if (!this.f.account.value || this.f.quantity.value < 1) {
      return false;
    } else if (this.f.quantity.value > this.amount) {
      return false;
    } else {
      return true;
    }
  }

  get shares() {
    if (this.selected) {
      Object.values(this.selected['shares']);
    }
    return this.selected ? Object.keys(this.selected['shares']) : null;
  }


  async CompanyDetails(asx_code)  {
    if (!this.selected) {
      return null;
    } else {
      return this.companySearch.getCompanyByKeyword(asx_code).toPromise();
    }
  }

  /**
   * Using this function to validate the input as Validators weren't working.
   */

  ngOnInit() {
    this.middleMan.getUserAccounts(this.auth.getAccounts()).subscribe(accounts => {
      this.accounts = accounts as Array<Account>;
    });

    this.user = this.auth.getUser();
    console.log(this.user);

    this.sellForm = this.formBuilder.group({
      account: [''],
      quantity: [''],
    });



  }

  /**
   * Move up and down the pipeline by assigning an int, angular can decide
   * what state that int represents.
   */
  upPipeline() {
    this.pipeline += 1;
  }

  downPipeline() {
    this.pipeline -= 1;
  }

  async getCompanyDetails(asx_code) {
    this.company = await this.companySearch.getCompanyByKeyword(asx_code)
      .toPromise() as Company;
  }

  getShareDetails(asx_code) {
    if (this.company) {
      this.share.getSharePrice(asx_code).subscribe((sec) => {
        this.sharePrice = sec['Global Quote']['05. price'];
      });
    }
  }

  async getSellForm(asx_code) {
    await this.getCompanyDetails(asx_code);
    const shareDetails = await this.share.getSharePrice(asx_code).toPromise();
    this.sharePrice = shareDetails['Global Quote']['05. price'] * 100;
    this.upPipeline();
    this.amount = parseFloat(this.selected.shares[asx_code]);
  }

  async sell() {
    if (!this.validated_input) {
      return;
    }
    const transaction = {
      user_id: this.auth.getUser()._id,
      asx_code: this.company.asx_code,
      value: this.sharePrice,
      amount: -this.f.quantity.value,
      account_id: this.selected._id
    };

    const res = await this.middleMan.postTransaction(transaction);
    console.log(res);
    if (res) {
      this.certificate = res as TransactionPayload;
      console.log(this.certificate);
      this.upPipeline();
    }
  }
}
