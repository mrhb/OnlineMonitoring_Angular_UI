import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { ManagementModule } from './management/management.module';
import { MonitoredComponent } from './monitored/monitored.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'first-page', component: FirstPageComponent },
    { path: 'monitored-units', component: MonitoredComponent },
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
    { path: 'management', component: ManagementModule },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }