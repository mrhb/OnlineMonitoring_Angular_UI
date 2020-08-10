import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const routes: Routes = [
{ path: 'first-page', component: FirstPageComponent },
{ path: '', redirectTo: '/first-page', pathMatch: 'full' },
{ path: 'second-page', component: DashboardPageComponent }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }