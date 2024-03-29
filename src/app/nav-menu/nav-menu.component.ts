import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Role, User } from '@app/_models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '@app/management/services/users.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  user: User;
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
        this.user = this.authenticationService.userValue;

        this.user$=this.authenticationService.userSubject;
        this.owners$=this.authenticationService.owners;
        this.thenBlock = this.primaryBlock;
      }

  ngOnInit(): void {
    this.user$.subscribe(user=>{
      if(user && ( this.selectedOwnerId!=user.ownerId))
      {
        this.selectedOwnerId=user.ownerId
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

  GetAvatarPath(user: User): string {
    // return 'http://localhost:3600/uploads/responsive/171193a957e36297b8aade6a17b70364_lg.png';
    var path= user ? 
    user.avatarPath?environment.userUrl+'/'+user.avatarPath:'' : '';
    return path;
  }
  logout() {
    this.authenticationService.logout();
  }
}
