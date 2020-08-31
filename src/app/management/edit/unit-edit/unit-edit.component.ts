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
  unit$: Observable<Unit>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UnitsService
  ) { }
  
  ngOnInit(): void {
    this.unit$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.get(params.get('id')))
      );
    }


    gotoUserss(unit: Unit) {
      const userId = unit ? unit.id : null;
      // Pass along the hero id if available
      // so that the HeroList component can select that hero.
      // Include a junk 'foo' property for fun.
      this.router.navigate(['/management/units']);
    }

}
