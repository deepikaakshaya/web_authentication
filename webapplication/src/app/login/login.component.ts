import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  displayLoginForm: boolean = false;
  authenticateMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _userService: UserService
  ) {}
  loginForm = this.formBuilder.group({
    EmployeeID: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[0-9]*'),
      ],
    ],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.displayLoginForm = true;
  }

  /**
   * Used to validate user on login form Submission
   */
  loginFormSubmission() {
    let authenticateRequest = {
      userName: this.loginForm.get('EmployeeID')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this._userService.authenticateUser(authenticateRequest).subscribe(
      (data) => {
        if (data.authenticated === true) {
          console.log('Logged in successfully');
          // console.log('Success', data);
          console.log('Success data values are ', data);
        } else {
          this.authenticateMessage = true;
          console.log('check your logged in details clearly', data);
        }
      },
      (error) => console.log('Error', error)
    );
  }

  /**
   * To display forgot password section and hide other sections
   */
  enableForgotPasswordSection() {
    this.displayLoginForm = false;
  }

  /**
   * To display forgot employee id section and hide other sections
   */
  enableForgotIdSection() {
    this.displayLoginForm = false;
  }
}
