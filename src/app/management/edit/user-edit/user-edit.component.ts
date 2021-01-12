import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../services/user';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../../_helpers/must-match.validator';
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { DialogBodyComponent } from '@app/management/dialog-body/dialog-body.component';
import { environment } from '@environments/environment';
 

const PERMISSIONLEVELS=[
  {permissionLevel:environment.permissionLevels.ADMIN, name: "Admin"},
  {permissionLevel:environment.permissionLevels.NORMAL_USER, name: "Normal user"},
  {permissionLevel:environment.permissionLevels.OWNER, name: "Owner"},
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
  formGroup :FormGroup ; 


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }
  step = 3;
  onFormSubmit(): void {
    console.log('Name:' + this.formGroup.get('name').value);
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

  //   createForm() {
  //     let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     this.formGroup = this.formBuilder.group({
  //       'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
  //       'name': [null, Validators.required],
  //       'password': [null, [Validators.required, this.checkPassword]],
  //       'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
  //       'validate': ''
  //     });
  //   }

    
  // setChangeValidate() {
  //   this.formGroup.get('validate').valueChanges.subscribe(
  //     (validate) => {
  //       if (validate == '1') {
  //         this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
  //         this.titleAlert = "You need to specify at least 3 characters";
  //       } else {
  //         this.formGroup.get('name').setValidators(Validators.required);
  //       }
  //       this.formGroup.get('name').updateValueAndValidity();
  //     }
  //   )
  // }
    gotoUserss(user: User) {
      const userId = user ? user.id : null;
      // Pass along the hero id if available
      // so that the HeroList component can select that hero.
      // Include a junk 'foo' property for fun.
      this.router.navigate(['/management/users']);
    }
   

  //  checkPassword(control) {
  //   let enteredPassword = control.value
  //   let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //   return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  // }

  // checkInUseEmail(control) {
  //   // mimic http database access
  //   let db = ['tony@gmail.com'];
  //   return new Observable(observer => {
  //     setTimeout(() => {
  //       let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
  //       observer.next(result);
  //       observer.complete();
  //     }, 4000)
  //   })
  // }

  // getErrorEmail() {
  //   return this.formGroup.get('email').hasError('required') ? 'Field is required' :
  //     this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
  //       this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  // }

  // getErrorPassword() {
  //   return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
  //     this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  // }

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