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


import { EditModule } from  './edit/edit.module';



import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './services/data.service';



import { UnitsComponent } from './units/units.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { ManagementComponent } from './management.component';
import { ActivityComponent } from './activity/activity.component';


import { MatTableModule } from '@angular/material/table';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




const  routes:  Routes  = [
  {
  path:  'management',
  component:  ManagementComponent,
  children: [
    {
      path:  'groups',
      component:  GroupsComponent
      },
    {
      path:  'users',
      component:  UsersComponent
    },
    {
      path:  'units',
      component:  UnitsComponent
    },
    {
      path:  'activity',
      component:  ActivityComponent
    },
    {
      path:  'edit',
      component:  EditComponent
    }
  ]
  }
  ];


@NgModule({
  declarations: [UnitsComponent, UsersComponent, GroupsComponent, ManagementComponent, ActivityComponent, DialogBodyComponent],
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

    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(DataService),

    EditModule,

    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagementModule { }
