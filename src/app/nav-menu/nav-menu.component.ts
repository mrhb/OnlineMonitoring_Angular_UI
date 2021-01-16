import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Role, User } from '@app/_models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '@app/management/services/users.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  user$: Observable<User>;
  unitInfoForm : FormGroup;
  filteredOptions: Observable<User[]>;

  show = true;
  thenBlock: TemplateRef<any>|null = null;
  @ViewChild('primaryBlock', {static: true}) primaryBlock: TemplateRef<any>|null = null;
  @ViewChild('secondaryBlock', {static: true}) secondaryBlock: TemplateRef<any>|null = null;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private UsersService: UsersService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) {
      this.user$=this.authenticationService.user;
      this.thenBlock = this.primaryBlock;

      
      
    }
    ngOnInit(): void {

  this.UsersService.getAll()
  .subscribe(
    data => {
      this.filteredOptions=data;
      // this.filteredOptions = this.userId.valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filter(value))
      // );
      console.log(data);
    },
    error => {
      console.log(error);
    });

    this.unitInfoForm = this.formBuilder.group({
      userId: []
   });

  }

    displayName(user: User): string {
      return user ? 
      (user.firstName?user.firstName:"")+" "+(user.lastName?user.lastName:"") : '';
    }
  logout() {
    this.authenticationService.logout();
  }
}
