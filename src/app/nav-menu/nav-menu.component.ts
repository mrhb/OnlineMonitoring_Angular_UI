import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
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
  selectedOwnerId;
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
    ownerSelection:FormControl=new FormControl('');
    
    constructor(
      private breakpointObserver: BreakpointObserver,
      private UsersService: UsersService,
      private authenticationService: AuthenticationService) {
        this.user$=this.authenticationService.user;
        this.thenBlock = this.primaryBlock;
    }

    ngOnInit(): void {
      this.user$.subscribe(user=>{
        this.selectedOwnerId=user.ownerId
      });
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

  }
  UpdateOwnerId(){
    this.authenticationService.setOwnerId(this.selectedOwnerId).pipe(first())
    .subscribe({
        next: () => {
            // get return url from query parameters or default to home page

        },
        error: error => {

        }
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
