import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { MaterialModule } from '@app/app-material.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { UnitComponent } from './unit/unit.component';


const  unitRoutes:  Routes  = [
  {
  path:  'unit',
  component:  UnitComponent,
  children: [
    {
      path:  'detail/:id',
      component:  DetailComponent,
    }
  ]
  }
  ];



@NgModule({
  declarations: [DetailComponent, UnitComponent],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,

    
    CommonModule,
    MaterialModule,
    RouterModule.forChild(unitRoutes)
  ],
  exports: [RouterModule]
})
export class UnitModule { }
