import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hide = true;


  loginForm = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])

  });

  adminLoginForm = new FormGroup({
    adminid: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
    adminName: new FormControl("", [Validators.required]),
    adminPass: new FormControl("", [Validators.required])
  });
  get adminNameValid() {
    return this.adminLoginForm.get('adminName');
  }
  get adminidValid() {
    return this.adminLoginForm.get('adminid');
  }

  get adminPassValid() {
    return this.adminLoginForm.get('adminPass');
  }


  get nameValid() {
    return this.loginForm.get('userName');
  }
  get passwordValid() {
    return this.loginForm.get('password');
  }

  constructor(private _auth: AuthService, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {

  }

  memberSubmit() {
    this._auth.userLogin(this.loginForm.value);


  }
  adminSubmit() {
    this._auth.adminLogin(this.adminLoginForm.value);


  }
  clearErrorMessage(): void {
    this._snackBar.dismiss();
  }
  openSnackBar(msg: string): void {
    this._snackBar.open(msg, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  clearForm() {
    this.adminLoginForm.reset();
    this.loginForm.reset();
    console.log("clear");
  }
}

