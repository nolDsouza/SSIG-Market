import { Component, OnInit } from '@angular/core';
import { TransactionAccountService } from '../../transaction-account.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private transAcctService: TransactionAccountService) { }

  ngOnInit() {
    this.transAcctService.getTransactionAccounts().subscribe((transAccts) => {
      console.log(transAccts);
    });
  }

}
