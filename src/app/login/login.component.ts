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

  loginForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])

  });

  adminLogiForm = new FormGroup({
    adminName: new FormControl(null, [Validators.required]),
    adminid: new FormControl(null, [Validators.required]),
    adminPass: new FormControl(null, [Validators.required])
  });
  get adminNameValid() {
    return this.adminLogiForm.get('adminName');
  }
  get adminidValid() {
    return this.adminLogiForm.get('adminid');
  }

  get adminPassValid() {
    return this.adminLogiForm.get('adminPass');
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
    this._auth.testHttpRequest(this.loginForm.value);

  }
  adminSubmit() {
    console.log(this.adminLogiForm.value);
    alert(this.adminNameValid?.value);
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
}

