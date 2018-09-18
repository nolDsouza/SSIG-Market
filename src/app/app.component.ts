import { Component } from '@angular/core';
import {Companies, CompanyShares} from './buy-sell/buysellarrays';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-login';
  companies = Companies;
}

