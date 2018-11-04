import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Rotary, rotary, queue } from '../utilities/rotary';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  dictionary = {};
  // Use a rotary queue of keys, as there is many and we want to only use one.
  api_keys: Rotary = rotary(queue(environment.api_keys.split(' ')));
  uri = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE';
  url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY';

  constructor(private http: HttpClient) { }

  get api() { return this.api_keys.next(); }

  /**
   * Get some global data from the api on share prices for a given asx code
   * At the time this function is called it is expected that the parameter
   * has already been validated. So any errors are not expected to be user fault.
   * Also if the information was queried for very recently (hasn't even refreshed)
   * then don't use the key again, just cahce the data.
   * @Param _sym is the asx code symbol.
   */
  getSharePrice(_sym) {
    const definition = this.dictionary[_sym];
    if (!definition) {
      return this.dictionary[_sym] = this.http.get(`${this.uri}&symbol=asx:${_sym}&apikey=${this.api}`);
    } else {
      return definition;
    }
  }

  getTimeSeries(_sym) {
    return this.http.get(`${this.url}&symbol=asx:${_sym}&outputsize=compact&apikey=${this.api}`)
      .toPromise();
  }
}
