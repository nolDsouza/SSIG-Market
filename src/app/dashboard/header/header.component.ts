import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private companySearch: CompanyService,
    private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      keyword: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  public logout() {
    localStorage.removeItem('sharelion-token');
    location.reload();
  }

  search() {
    console.log(this.searchForm.value.keyword);
    this.companySearch.getCompanyByKeyword(this.searchForm.value.keyword).subscribe((res) => {
      const company = res as Company;
      this.router.navigateByUrl(`/dashboard`);
    }, (err) => {
      console.error(err);
    });
  }
}
