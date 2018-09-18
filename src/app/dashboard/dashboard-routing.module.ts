import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

import { AuthGuardService } from '../guards/auth-guard.service';

const routes: Routes = [
  { path: 'dashboard', component: LayoutComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
  ],
})
export class DashboardRoutingModule { }
