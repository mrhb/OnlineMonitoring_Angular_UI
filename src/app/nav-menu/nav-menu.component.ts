import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Role, User } from '@app/_models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '@app/management/services/users.service';
import Notiflix from "notiflix-angular";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  user$: Observable<User>;
  owners$: Observable<User[]>;
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
      private authenticationService: AuthenticationService
      ) {
        this.user$=this.authenticationService.userSubject;
        this.owners$=this.authenticationService.owners;
        this.thenBlock = this.primaryBlock;
      }

  ngOnInit(): void {
    this.user$.subscribe(user=>{
      if(user && ( this.selectedOwnerId!=user.ownerId))
      {
        this.selectedOwnerId=user.ownerId
        Notiflix.Notify.Success('page Owner has been set');
      }
      });
  }
  UpdateOwnerId(){
    this.authenticationService.setOwnerId(this.selectedOwnerId);
  }
  displayName(user: User): string {
    return user ? 
    (user.firstName?user.firstName:"")+" "+(user.lastName?user.lastName:"") : '';
  }
  logout() {
    this.authenticationService.logout();
  }
}
