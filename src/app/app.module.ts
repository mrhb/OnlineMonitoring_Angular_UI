import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';



import { ChartsModule } from 'ng2-charts';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './dashboard/mainpanel/summary/summary.component';
import { PowerGraphComponent } from './dashboard/mainpanel/power-graph/power-graph.component';
import { CardComponent } from './dashboard/mainpanel/card/card.component';
import { StateChartComponent } from './dashboard/mainpanel/state-chart/state-chart.component';
import { ProgressBarComponent } from './dashboard/mainpanel/power-graph/progress-bar/progress-bar.component';
import { CommentsComponent } from './dashboard/mainpanel/comments/comments.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ServicesComponent } from './dashboard/mainpanel/services/services.component';
import { AlarmsComponent } from './dashboard/mainpanel/alarms/alarms.component';
import { MainpanelComponent } from './dashboard/mainpanel/mainpanel.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { GroupsComponent } from './sidepanel/groups/groups.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';



import { ManagementModule } from  './management/management.module';
import { UnitModule } from  './unit/unit.module';
import { TrendsModule } from  './trends/trends.module';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import{    MaterialModule} from './app-material.module'


// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { RegistrationComponent } from './login/registration/registration.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaintenanceAddDlgComponent } from './maintenance/maintenance-add-dlg/maintenance-add-dlg.component'
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FirstPageComponent,
    SummaryComponent,
    DashboardComponent,
    PowerGraphComponent,
    CardComponent,
    StateChartComponent,
    ProgressBarComponent,
    CommentsComponent,
    ServicesComponent,
    AlarmsComponent,
    MainpanelComponent,
    SidepanelComponent,
    GroupsComponent,
    LoginComponent,
    RegistrationComponent,
    MaintenanceAddDlgComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatDialogModule,
    DpDatePickerModule,

    ChartsModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    ManagementModule,
    UnitModule,
    MatPaginatorModule,
    MatSortModule,
    TrendsModule,
    LeafletModule,
    MatFormFieldModule,
    MaterialModule
      ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
