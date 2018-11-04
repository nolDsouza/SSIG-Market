import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  private companyForm: FormGroup;
  private companies: Company[];

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.companyService.getCompanies().subscribe(res => {
      this.companies = res as Company[];
    });

    this.companyForm = this.formBuilder.group({
      companyName: [''],
    });
  }

  get f() { return this.companyForm.controls; }

}
