import { RegisterUserService } from './../services/register-user.service';
import { Directive, Renderer2, ElementRef, OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroupDirective, NgForm, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NewUserService } from '../services/new-user.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { matchValidator } from './form-validators';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private renderer: Renderer2, private el: ElementRef,
    private formBuilder: FormBuilder,
    private ns: NewUserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private rs: RegisterUserService
  ) { }

  ngOnInit(): void {

  }
  signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password1: ['',
    [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(25),
    matchValidator('password2', true)
    ]
  ],
    password2: ['', [Validators.required, matchValidator('password1')],],
    username: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    is_student: [null, [Validators.required]],
    is_educator: [null, [Validators.required]],
  });

  /**
   * submit signup information to api
   */
  signup() {
    this.rs.newUsers(this.signupForm.value).subscribe(
      {
        next: (res) => {
          const container = document.getElementById('container');
          this.renderer.removeClass(container, "right-panel-active");
          console.log(res)
          this.snackBar.open('Account Created Sucessfully', 'Close', {
            duration: 4000,
            verticalPosition: this.verticalPosition,
          })
        }
      }
    )

  }

  /**
   *  educator is true in form
   *  student is false
   */
  onClickeducator() {
    this.signupForm.patchValue({
      is_student: false,
      is_educator: true
    });
  }

  /**
   *  educator is false in form
   *  student is true
  */
  onClickstudent() {
    this.signupForm.patchValue({
      is_student: true,
      is_educator: false
    });
  }

  /**
   * Switches form to right
   */
  switch_right() {
    const container = document.getElementById('container');
    this.renderer.addClass(container, "right-panel-active");
  }

  /**
   * Switches form to left
   */
  switch_left() {
    const container = document.getElementById('container');
    this.renderer.removeClass(container, "right-panel-active");
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * submit login information to api
   */
  login() {
    this.ns.login(this.loginForm.value).subscribe({
      error: (err) => {
        if (err.status === 401) {
          this.snackBar.open('Invalid Username or Password', 'Close', {
            duration: 4000,
            verticalPosition: this.verticalPosition,
          })
        }
      }
    }
    )
  }
}


