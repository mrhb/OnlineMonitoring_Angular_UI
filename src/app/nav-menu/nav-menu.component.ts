import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Role, User } from '@app/_models';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  user: User;
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
    private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe(x => 
        {
          this.user = x
        });

      this.thenBlock = this.primaryBlock;
    }
  logout() {
    this.authenticationService.logout();
}
}
