import { NgModule } from  '@angular/core';
import { Routes, RouterModule } from  '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

import { EditComponent } from './edit.component';

import { UserEditComponent } from './user-edit/user-edit.component';


const  routes:  Routes  = [
  {
      path:  'management/edit',
      component:  EditComponent,
      children: [
        {
          path:  'userq',
          component: UserEditComponent
          },
          {
          path: '', 
          component: EditComponent
         },
        ]
    }
  ];



@NgModule({
  declarations: [UserEditComponent,EditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EditModule { }
