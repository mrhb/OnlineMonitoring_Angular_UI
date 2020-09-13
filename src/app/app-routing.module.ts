import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FirstPageComponent } from './first-page/first-page.component';
import { ManagementModule } from './management/management.module';
import { MonitoredComponent } from './monitored/monitored.component';


const routes: Routes = [
    { path: 'first-page', component: FirstPageComponent },
    { path: 'monitored-units', component: MonitoredComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'management', component: ManagementModule },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }