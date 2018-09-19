import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import { TransactionAccountService } from './services/transaction-account.service';
import { AutoLoginService } from './guards/auto-login.service';

import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  { path: 'create', component: CreateComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'login', component: LoginComponent, canActivate: [AutoLoginService]},
  { path: 'register', component: RegisterComponent, canActivate: [AutoLoginService]},
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    DashboardModule,
    SharedModule,
  ],
  providers: [
    TransactionAccountService,
    AutoLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
