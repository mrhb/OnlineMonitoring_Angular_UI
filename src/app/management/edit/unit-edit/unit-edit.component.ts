import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UnitsService } from '../../services/units.service';
import { Unit } from '../../services/unit';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.css']
})
export class UnitEditComponent implements OnInit {
  id: string;
  isAddMode: boolean;
   constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }


}
