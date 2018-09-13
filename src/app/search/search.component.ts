import { Component, OnInit } from '@angular/core';
import {Companies, CompanyShares} from '../buy-sell/buysellarrays';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
Companies = CompanyShares;
  constructor() { }

  ngOnInit() {
  }

}
