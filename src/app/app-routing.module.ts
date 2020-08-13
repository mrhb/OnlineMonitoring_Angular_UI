import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FirstPageComponent } from './first-page/first-page.component';

import { DashComponent } from './dash/dash.component';


const routes: Routes = [
    { path: 'first-page', component: FirstPageComponent },
    { path: 'dashboard', component: DashboardComponent },
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
{ path: 'dash', component: DashComponent }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }