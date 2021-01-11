import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { ManagementModule } from './management/management.module';
import { MonitoredComponent } from './monitored/monitored.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models';


const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'first-page', component: FirstPageComponent,canActivate: [AuthGuard],data: { roles: [Role.Admin] }},
    { path: 'monitored-units', component: MonitoredComponent },
    // { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard], data: { roles: [Role.Admin]} },
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
    { path: 'management', component: ManagementModule ,canActivate: [AuthGuard]},
    { path: 'registration', component: RegistrationComponent },
    { path: '', redirectTo: 'monitored-units', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }