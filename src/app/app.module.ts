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


import { ManagementModule } from  './management/management.module';



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
  ],
  imports: [
    BrowserModule,
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
    ManagementModule
      ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
