import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ChartsModule } from 'ng2-charts';





import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './dashboard/summary/summary.component';
import { PowerGraphComponent } from './dashboard/power-graph/power-graph.component';
import { ServiceFilterComponent } from './dashboard/service-filter/service-filter.component';
import { ActiveCommentsComponent } from './dashboard/active-comments/active-comments.component';
import { DashComponent } from './dash/dash.component';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './dashboard/card/card.component';
import { StateChartComponent } from './dashboard/state-chart/state-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FirstPageComponent,
    SummaryComponent,
    DashboardComponent,
    PowerGraphComponent,
    ServiceFilterComponent,
    ActiveCommentsComponent,
    DashComponent,
    CardComponent,
    StateChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    ChartsModule,
      ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
