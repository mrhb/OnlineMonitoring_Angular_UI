import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendsComponent } from './trends.component';
import { SideComponent } from './side/side.component';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [TrendsComponent, SideComponent, ContentComponent],
  imports: [
    CommonModule
  ]
})
export class TrendsModule { }
