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
  ],
  exports: [
    HeaderComponent,
    ToolbarComponent,
    FooterComponent
  ],
})
export class DashboardModule { }
