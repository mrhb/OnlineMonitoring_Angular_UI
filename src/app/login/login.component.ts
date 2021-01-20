import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }
    
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:this.email,
        password: this.password
    });
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
      onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.email.value, this.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Login',
                    text: 'you logged in successfully',
                    timer: 2000,
                    buttons: false,
                  })
                  .then(() => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/monitored-units';
                    this.router.navigateByUrl(returnUrl);
                    this.loading = false;
                  })
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                    Swal.fire({
                      icon: 'error',
                      title: 'Login',
                      text: error,
                      timer: 2000,
                      buttons: false,
                    })

                }
            });
    }
}
