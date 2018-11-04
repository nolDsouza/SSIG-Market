import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ShareSummaryComponent } from './share-summary/share-summary.component';
import { AccountComponent } from './account/account.component';
import { TransferComponent } from './transfer/transfer.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ChatComponent } from './chat/chat.component';
import { HistoryComponent } from './history/history.component';
import { GraphComponent } from './graph/graph.component';
import { CompaniesComponent } from './companies/companies.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';

import { AuthGuardService } from '../guards/auth-guard.service';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'share-summary', component: ShareSummaryComponent, canActivate: [AuthGuardService] },
  { path: 'accounts', component: AccountComponent, canActivate: [AuthGuardService] },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuardService] },
  { path: 'marketplace/:company', component: MarketplaceComponent, canActivate: [AuthGuardService] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuardService] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuardService] },
  { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuardService] },
  { path: 'faq', component: FaqComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
  ],
})
export class DashboardRoutingModule { }
