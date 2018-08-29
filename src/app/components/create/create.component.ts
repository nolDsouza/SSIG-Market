import { Component, OnInit } from '@angular/core';
import { TransactionAccountService } from '../../transaction-account.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private transAcctService: TransactionAccountService) { }

  ngOnInit() {
  }

}
