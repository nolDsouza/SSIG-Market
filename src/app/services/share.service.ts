import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  uri = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE';
  api = 'apikey=07SW4DR85HCX3RP2';
  constructor(private http: HttpClient) { }

  getSharePrice(_sym) {
    return this.http.get(`${this.uri}&symbol=asx:${_sym}&${this.api}`);
  }
}
