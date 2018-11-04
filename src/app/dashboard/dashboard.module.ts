import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ShareSummaryComponent } from './share-summary/share-summary.component';
import { AccountComponent } from './account/account.component';

import { TransferDirective } from '../directives/transfer.directive';
import { TransferComponent } from './transfer/transfer.component';
import { MonetaryPipe } from './pipes/monetary.pipe';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ChatComponent } from './chat/chat.component';
import { HistoryComponent } from './history/history.component';
import { AbsPipe } from './pipes/abs.pipe';
import { GraphComponent } from './graph/graph.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyFilterPipe } from './pipes/company-filter.pipe';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ToolbarComponent,
    HomeComponent,
    ShareSummaryComponent,
    AccountComponent,
    TransferDirective,
    TransferComponent,
    MonetaryPipe,
    MarketplaceComponent,
    ChatComponent,
    HistoryComponent,
    AbsPipe,
    GraphComponent,
    CompaniesComponent,
    CompanyFilterPipe,
    AboutComponent,
    FaqComponent,
  ],
  exports: [
    HeaderComponent,
    ToolbarComponent,
    FooterComponent
  ],
})
export class DashboardModule { }
