import { Component, OnInit } from '@angular/core';
import {AllTrans, Transactions} from './transactions';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
allT = AllTrans;

  constructor() { }

  ngOnInit() {
  }

}
