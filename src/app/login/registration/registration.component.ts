import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      address: [''],
      firstname: [''],
      lastname: [''],

  });
  }
// convenience getter for easy access to form fields
get f() { return this.signupForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.signupForm.invalid) {
      return;
  }

  this.loading = true;
  this.authenticationService.signup(
    this.f.firstname.value,
    this.f.lastname.value,
    this.f.address.value,
    this.f.username.value, 
    this.f.password.value)
      .pipe(first())
      .subscribe({
          next: () => {
              // get return url from query parameters or default to home page
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
              this.router.navigateByUrl('/login');
              this.loading = false;
          },
          error: error => {
              this.error = error;
              this.loading = false;
          }
      });
}

}
