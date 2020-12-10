import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UnitsService } from '../../services/units.service';
import { Group } from '../../services/group';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogBodyComponent } from '@app/management/dialog-body/dialog-body.component';


export enum GroupType {
  site= "site", 
  wecControl="wecControl", 
  basic= "basic"
}
const GROUPS=[
  {type:GroupType.site, name: "site"},
  {type:GroupType.wecControl, name: "wecControl"},
  {type:GroupType.basic, name: "basic"},
];


@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  hide = true;
  InfoForm :FormGroup ; 
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  groups=GROUPS
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private DataService: GroupsService
  ) {}
    
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    this.InfoForm = this.formBuilder.group({
       // title: ['', Validators.required],
       name: ['', Validators.required],
       groupType:[],

      //  lastName: ['', Validators.required],
      //   email: ['', [Validators.required, Validators.email]],
      //   permissionLevel: [1, Validators.required],
      //   password: ['123456', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      //  confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    }, {
      //  validator: MustMatch('password', 'confirmPassword')
    });

    if (!this.isAddMode) {
        this.DataService.get(this.id)
            .pipe(first())
            .subscribe(x =>
              {
                console.log(x);
                 this.InfoForm.patchValue(x);
              }
              );
    }
    }

    gotoGroups() {
      // Pass along the hero id if available
      // so that the HeroList component can select that hero.
      // Include a junk 'foo' property for fun.
      this.router.navigate(['/management/groups']);
    }
   
  resetForm() { 
    this.router.navigate(['/management/groups']);
 } 
  get f() { return this.InfoForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      //this.alertService.clear();

      // stop here if form is invalid
      if (this.InfoForm.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.create();
      } else {
          this.update();
      }
  }

  private create() {
      this.DataService.create(this.InfoForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
                //  this.alertService.success('User added', { keepAfterRouteChange: true });
                  this.router.navigate(['/management/groups'], { relativeTo: this.route });
              },
              error: error => {
              //    this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

  private update() {
      this.DataService.update(this.id, this.InfoForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
             //     this.alertService.success('User updated', { keepAfterRouteChange: true });
                  // this.router.navigate(['/management/users'], { relativeTo: this.route });
                  this.router.navigate(['/management/groups']);
              },
              error: error => {
              //    this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
  deleteUser(){

    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {name: this.InfoForm.value.name, type: "group"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.DataService.delete(this.id).subscribe();
                    //     this.alertService.success('User updated', { keepAfterRouteChange: true });
                  // this.router.navigate(['/management/users'], { relativeTo: this.route });
                  this.router.navigate(['/management/groups']);
      } 

    });   
  }
}