import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { ShareService } from '../../services/share.service';
import { Account } from '../../models/account.model';
import { Transaction, TransactionPayload  } from '../../models/transaction.model';
import { TransactionAccountService } from '../../services/transaction-account.service';
import { AuthenticationService } from '../../services/authentication.service';
import { GraphComponent } from '../graph/graph.component';
import * as CanvasJS from '../../utilities/canvasjs.min';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  // Going to do the buying pipeline on one html page, so there are no
  // routes that need to be guarded.
  private company_details = 0;
  private purchase = 1;
  private confirmation = 2;
  private checkout = 3;
  private pipeline = this.company_details;

  private company: Company;
  private sharePrice: number;
  private buyForm: FormGroup;
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

  get f() { return this.buyForm.controls; }

  get selected() {
    return this.accounts ? this.accounts[this.f.account.value] : null;
  }

  get total() { return this.sharePrice * this.f.quantity.value; }

  /**
   * Using this function to validate the input as Validators weren't working.
   */
  get validated_input() {
    const account = new Account(this.selected);
    if (!this.f.account.value || this.f.quantity.value < 1) {
      return false;
    } else if (account.reserve < this.total) {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.middleMan.getUserAccounts(this.auth.getAccounts()).subscribe(accounts => {
      this.accounts = accounts as Array<Account>;
    });

    this.activeRoute.params.subscribe(params => {
      this.companySearch.getCompanyByKeyword(params.company).subscribe((res) => {
        this.company = res as Company;
        if (this.company) {
          this.share.getSharePrice(this.company.asx_code).subscribe((sec) => {
          this.sharePrice = sec['Global Quote']['05. price'] * 100;
          });
        }
        // Rendering here as the chart relies on the company code.
        this.renderChart();
      });
    });

    this.buyForm = this.formBuilder.group({
      account: [''],
      quantity: [''],
    });



  }

  upPipeline() {
    this.pipeline += 1;
  }

  downPipeline() {
    this.pipeline -= 1;
  }

  /**
   * Render a graph from a time series data set, provided by the alphavantage
   * api.
   */
  async renderChart() {
    const dataPoints = [];
    const json = await this.share.getTimeSeries(this.company.asx_code);
    const timeSeries = json['Time Series (Daily)'];
    for ( const key of Object.keys(timeSeries)) {
      dataPoints.push({ x: new Date(key), y: parseFloat(timeSeries[key]['4. close']) });
    }

    const chart = new CanvasJS.Chart('chartContainer', {
      title: {
        text: `ASX Performance - ${this.company.name}`
      },
      subtitles: [{
        text: `Industry - ${this.company.industry}`
      }],
      data: [
      {
        type: 'line',
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }

  async buy() {
    if (!this.validated_input) {
      return;
    }
    const transaction = {
      user_id: this.auth.getUser()._id,
      asx_code: this.company.asx_code,
      value: this.sharePrice,
      amount: this.f.quantity.value,
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
