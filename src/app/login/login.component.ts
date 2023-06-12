import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Call the login service method
    this.loginService.login({
      email: email,
      password: password
    })
      .subscribe(
        () => {
          // Login successful
          // Redirect to the desired page or perform any necessary actions
          this.router.navigateByUrl('/users');
        },
        () => {
          // Login error
          this.loginError = true;
          console.log('Invalid credentials');
        }
      );
  }

  logout(): void {
    this.loginService.logout();
  }
}
