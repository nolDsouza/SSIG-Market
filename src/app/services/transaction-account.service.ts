import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction.model';

export interface AccountBlueprint {
  accountName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionAccountService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getTransactionAccounts() {
    return this.http.get(`${this.uri}/transaction_accounts`);
  }

  getUserAccounts(identifiers: string[]) {
    const accounts = identifiers.join(';');
    return this.http.get(`${this.uri}/users/accounts/${accounts}`);
  }

  createTransactionAccount(id, blueprint: AccountBlueprint) {
    return this.http.post(`${this.uri}/users/accounts/create/${id}`, blueprint);
  }

  update(id, changes) {
    console.log(changes);
    return this.http.patch(`${this.uri}/users/accounts/${id}`, changes)
      .toPromise();
  }

  postTransaction(transaction: Transaction) {
    return this.http.post(`${this.uri}/marketplace/transactions`, transaction)
      .toPromise();
  }

  getTransactions(id) {
    return this.http.get(`${this.uri}/marketplace/transactions/${id}`, id)
      .toPromise();
  }

  delete(id) {
    return this.http.delete(`${this.uri}/users/accounts/${id}`)
      .toPromise();
  }
}
