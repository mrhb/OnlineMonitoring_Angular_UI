import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FirstPageComponent } from './first-page/first-page.component';

const routes: Routes = [
    { path: 'first-page', component: FirstPageComponent },
    { path: 'dashboard', component: DashboardComponent },
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }