import { Component, OnInit } from '@angular/core';
import { TransactionAccountService } from '../../transaction-account.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private transAcctSerivce: TransactionAccountService) { }

  ngOnInit() {
  }

}
