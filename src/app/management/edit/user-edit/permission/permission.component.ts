import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'user-edit-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  myGroup :FormGroup ; 

  constructor() { }

  ngOnInit(): void {
    

    this.myGroup = new FormGroup({
      name  :new FormControl(),  
      active  :new FormControl(true),  
      allAlarm:new FormControl(true),
      read    :new FormControl(true),  
      control :new FormControl(true),
      modify  :new FormControl(true),
   });
  }

}
