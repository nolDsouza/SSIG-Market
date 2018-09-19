import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get(`${this.uri}/companies`);
  }

  getCompanyByKeyword(key) {
    return this.http.get(`${this.uri}/companies/search/${key}`);
  }
}
