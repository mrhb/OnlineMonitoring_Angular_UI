import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';



import { CommonModule } from '@angular/common';
import { UnitsComponent } from './units/units.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { ManagementComponent } from './management.component';
import { ActivityComponent } from './activity/activity.component';


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
    }
  ]
  }
  ];


@NgModule({
  declarations: [UnitsComponent, UsersComponent, GroupsComponent, ManagementComponent, ActivityComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagementModule { }
