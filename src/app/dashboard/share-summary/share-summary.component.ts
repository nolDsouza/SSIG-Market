import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-share-summary',
  templateUrl: './share-summary.component.html',
  styleUrls: ['./share-summary.component.css']
})
export class ShareSummaryComponent implements OnInit {
  private company: Company;
  private sharePrice: number;
  private buyForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private companySearch: CompanyService,
    private share: ShareService,
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.companySearch.getCompanyByKeyword(params.company).subscribe((res) => {
        this.company = res as Company;
        if (this.company) {
          this.share.getSharePrice(this.company.asx_code).subscribe((sec) => {
          this.sharePrice = sec['Global Quote']['05. price'];
          });
        }
      });
    });

    this.buyForm = this.formBuilder.group({
      keyword: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  buy() {

  }
}
