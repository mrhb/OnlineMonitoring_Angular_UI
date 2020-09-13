import { NgModule } from  '@angular/core';
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
@NgModule({
  declarations: [TrendsComponent, SideComponent, TrendsContentComponent],
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

    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TrendsModule { }
