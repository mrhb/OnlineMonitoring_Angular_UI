import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';

import { ChartsModule } from 'ng2-charts';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './dashboard/mainpanel/summary/summary.component';
import { PowerGraphComponent } from './dashboard/mainpanel/power-graph/power-graph.component';
import { MatMenuModule } from '@angular/material/menu';
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
import { TrendsModule } from  './trends/trends.module';
import { MonitoredComponent } from './monitored/monitored.component';
import { MapComponent } from './monitored/map/map.component';
import { ContentComponent } from './monitored/content/content.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableviewComponent } from './monitored/content/tableview/tableview.component';
import { IconviewComponent } from './monitored/content/iconview/iconview.component';
import { ModuleviewComponent } from './monitored/content/moduleview/moduleview.component';
import { ViewUnitsDirective } from './monitored/content/view-units.directive';
import{SideComponent} from './monitored/side/side.component';
import { MinidetailsComponent } from './monitored/side/minidetails/minidetails.component';
import { FilterComponent } from './monitored/side/filter/filter.component'
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
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
    MonitoredComponent,
    MapComponent,
    ContentComponent,
    TableviewComponent,
    IconviewComponent,
    ModuleviewComponent,
    SideComponent,
    ViewUnitsDirective,
    MinidetailsComponent,
    FilterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ManagementModule,
    TrendsModule,
    LeafletModule,
    MatFormFieldModule,

      ],
  providers: [
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
