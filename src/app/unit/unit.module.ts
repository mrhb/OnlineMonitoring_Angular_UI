import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { MaterialModule } from '@app/app-material.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UnitComponent } from './unit/unit.component';
import { ContentComponent } from './monitored/content/content.component';
import { TableviewComponent } from './monitored/content/tableview/tableview.component';
import { IconviewComponent } from './monitored/content/iconview/iconview.component';
import { ModuleviewComponent } from './monitored/content/moduleview/moduleview.component';
import { ViewUnitsDirective } from './monitored/content/view-units.directive';


import { MinidetailsComponent } from './monitored/side/minidetails/minidetails.component';
import { FilterComponent } from './monitored/side/filter/filter.component'
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MonitoredComponent } from './monitored/monitored.component';
import { SideComponent } from './monitored/side/side.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { MapComponent } from './monitored/map/map.component';


const  unitRoutes:  Routes  = [
  {
  path:  'unit',
  component:  UnitComponent,
  children: [
    {
      path:  'detail/:id',
      component:  DetailComponent,
    },
    {
      path:  'monitored',
      component:  MonitoredComponent,
    }
  ]
  }
  ];



@NgModule({
  declarations: [DetailComponent, UnitComponent,
    
    MonitoredComponent,
    MapComponent,    
    ContentComponent,
    TableviewComponent,
    IconviewComponent,
    ModuleviewComponent,
    ViewUnitsDirective,
    SideComponent,
    MinidetailsComponent,
    FilterComponent,
  ],
  imports: [

    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatDialogModule,
    DpDatePickerModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    LeafletModule,
    MatFormFieldModule,
    
    CommonModule,
    MaterialModule,
    RouterModule.forChild(unitRoutes)
  ],
  exports: [RouterModule],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnitModule { }
