import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ShareSummaryComponent } from './share-summary/share-summary.component';

import { AuthGuardService } from '../guards/auth-guard.service';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'share-summary/:company', component: ShareSummaryComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
  ],
})
export class DashboardRoutingModule { }
