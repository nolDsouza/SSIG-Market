import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionAccountService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getTransactionAccounts() {
    return this.http.get(`${this.uri}/transaction_accounts`);
  }

  getTransactionAccountById(id) {
    return this.http.get(`${this.uri}/accounts/${id}`);
  }

  addTransactionAccount(name, owner, balance, shares, value, description) {
    const transAcct = {
      name: name,
      owner: owner,
      balance: balance,
      shares: shares,
      value: value,
      description: description
    };
    return this.http.post(`${this.uri}/transaction_accounts/add`, transAcct);
  }

  updateTransactionAccount(id, name, owner, balance, shares, value, description) {
    const transAcct = {
      name: name,
      owner: owner,
      balance: balance,
      shares: shares,
      value: value,
      description: description
    };
    return this.http.post(`${this.uri}/transaction_accounts/update/${id}`, transAcct);
  }

  deleteTransactionAccount(id) {
    return this.http.get(`${this.uri}/transaction_accounts/delete/${id}`);
  }
}
