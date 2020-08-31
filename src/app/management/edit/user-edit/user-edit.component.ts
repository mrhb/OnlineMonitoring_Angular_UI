import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../services/user';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user$: Observable<User>;

  formGroup :FormGroup ; 
titleAlert: string = 'This field is required';
post: any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService,
    private formBuilder: FormBuilder
  ) { }
  step = 1;
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
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.get(params.get('id')))
      );

      this.formGroup=new FormGroup({
        email:new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl(),
        fone:new FormControl(),
        tel: new FormControl(),
        company: new FormControl(),
        country: new FormControl()
     });
      // this.createForm();
      // this.setChangeValidate()
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
    resetForm() { 

      this.user$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
        this.service.get(params.get('id')))
        );
        
      this.formGroup.reset({
         name: "sdfv",
         age: 20
      });
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
  //  onSubmit(post) {
  //   this.post = post;
  // }

}