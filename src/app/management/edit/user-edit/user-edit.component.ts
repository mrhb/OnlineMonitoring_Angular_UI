import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../services/user';
import { Permission } from '@app/_models/user';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../../_helpers/must-match.validator';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { DialogBodyComponent } from '@app/management/dialog-body/dialog-body.component';
 

const PERMISSIONLEVELS=[
  {permissionLevel:Permission.ADMIN, name: "Admin"},
  {permissionLevel:Permission.NORMAL, name: "Normal user"},
  {permissionLevel:Permission.OWNER, name: "Owner user"},
];

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  hide = true;
  userInfoForm :FormGroup ; 
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  permissionLevels=PERMISSIONLEVELS;

  uploadForm: FormGroup;  



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }
  step = 3;


onFileSelect(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.uploadForm.get('profile').setValue(file);
  }
}
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }



  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.userInfoForm = this.formBuilder.group({
      // title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      permissionLevel: [1, Validators.required],
      password: ['123456', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      //  confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    }, {
      //  validator: MustMatch('password', 'confirmPassword')
    });

    if (!this.isAddMode) {
        this.userService.get(this.id)
            .pipe(first())
            .subscribe(x =>
              {
                console.log(x);
                 this.userInfoForm.patchValue(x);
              }
              );
    }
    }

    gotoUserss(user: User) {
      const userId = user ? user.id : null;
      // Pass along the hero id if available
      // so that the HeroList component can select that hero.
      // Include a junk 'foo' property for fun.
      this.router.navigate(['/management/users']);
    }

    onProfileSubmit() {
      const formData = new FormData();
      formData.append('avatar', this.uploadForm.get('profile').value);
      this.userService.set_avatar(this.id,formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }

  resetForm() { 
    this.router.navigate(['/management/users']);
 } 
  get f() { return this.userInfoForm.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      //this.alertService.clear();

      // stop here if form is invalid
      if (this.userInfoForm.invalid) {
          return;
      }

      this.loading = true;
      if (this.isAddMode) {
          this.createUser();
      } else {
          this.updateUser();
      }
  }

  private createUser() {
      this.userService.create(this.userInfoForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
                //  this.alertService.success('User added', { keepAfterRouteChange: true });
                  this.router.navigate(['../'], { relativeTo: this.route });
              },
              error: error => {
              //    this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

  private updateUser() {
      this.userService.update(this.id, this.userInfoForm.value)
          .pipe(first())
          .subscribe({
              next: () => {
             //     this.alertService.success('User updated', { keepAfterRouteChange: true });
                  // this.router.navigate(['/management/users'], { relativeTo: this.route });
                  this.router.navigate(['/management/users']);
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
      data: {name: this.userInfoForm.value.email, type: "user"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.userService.delete(this.id).subscribe();
                    //     this.alertService.success('User updated', { keepAfterRouteChange: true });
                  // this.router.navigate(['/management/users'], { relativeTo: this.route });
                  this.router.navigate(['/management/users']);
      } 

    });   
  }
}