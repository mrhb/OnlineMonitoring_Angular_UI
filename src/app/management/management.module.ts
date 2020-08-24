import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';

import { CommonModule } from '@angular/common';
import { UnitsComponent } from './units/units.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { ManagementComponent } from './management.component';


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
  }
  ]
  }
  ];


@NgModule({
  declarations: [UnitsComponent, UsersComponent, GroupsComponent, ManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagementModule { }
