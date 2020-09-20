import { NgModule } from  '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from  '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';

import { TrendsComponent } from './trends.component';
import { SideComponent } from './side/side.component';
import { TrendsContentComponent } from './content/content.component';
import { MatTableModule } from '@angular/material/table';
import { TrendsViewDirective } from './content/trends-view.directive';
import { TableViewComponent } from './content/table-view/table-view.component';
import { ChartViewComponent } from './content/chart-view/chart-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import { TimeRangeDilaogueComponent } from './content/time-range-dilaogue/time-range-dilaogue.component';



const  routes:  Routes  = [
  {
  path:  'trends',
  component:  TrendsComponent,
  children: [
    {
      path:  'qw/:id',
      component: TrendsContentComponent,
      // outlet: 'trendContent'
    },
    // {
    //   path:  'users',
    //   component:  UsersComponent
    // },
    // {
    //   path:  'units',
    //   component:  UnitsComponent
    // },
    // {
    //   path:  'activity',
    //   component:  ActivityComponent
    // },
    // {
    //   path:  'edit',
    //   component:  EditComponent
    // }
  ]
  }
  ];

  
import { DateAdapter,MAT_DATE_FORMATS,  MAT_DATE_LOCALE } from "@angular/material/core";

import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from "../shared/material.persian-date.adapter";

@NgModule({
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
  declarations: [TrendsComponent, SideComponent, TrendsContentComponent, TrendsViewDirective, TableViewComponent, ChartViewComponent, TimeRangeDilaogueComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule, 
    MatSelectModule,
    BrowserModule,
    ChartsModule,
    DpDatePickerModule,

    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TrendsModule { }
