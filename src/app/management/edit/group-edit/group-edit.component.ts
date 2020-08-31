import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UnitsService } from '../../services/units.service';
import { Group } from '../../services/group';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  group$: Observable<Group>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GroupsService
  ) { }
  
  ngOnInit(): void {
    this.group$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.get(params.get('id')))
      );
    }


    gotoUserss(group: Group) {
      const userId = group ? group.id : null;
      // Pass along the hero id if available
      // so that the HeroList component can select that hero.
      // Include a junk 'foo' property for fun.
      this.router.navigate(['/management/units']);
    }

}
