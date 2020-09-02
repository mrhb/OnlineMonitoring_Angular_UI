import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';





import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';



import { EditComponent } from './edit.component';

import { UserEditComponent } from './user-edit/user-edit.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PermissionComponent } from './user-edit/permission/permission.component';
import { UnitPermissionComponent } from './unit-edit/permission/permission.component';
import { UnitgroupsComponent } from './unit-edit/groups/groups.component';


const  routes:  Routes  = [
  {
      path:  'management/edit',
      component:  EditComponent,
      children: [
        {
          path:  'user/:id',
          component: UserEditComponent
        },
        {
          path:  'group/:id',
          component: GroupEditComponent
        },
        {
          path:  'unit/:id',
          component: UnitEditComponent
        }
      ]
    }
  ];



@NgModule({
  declarations: [
    UserEditComponent,
    EditComponent, 
    GroupEditComponent,
     UnitEditComponent, 
     PermissionComponent,
     UnitPermissionComponent,
     UnitgroupsComponent,
    ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    
  ],
  exports: [RouterModule]
})
export class EditModule { }
