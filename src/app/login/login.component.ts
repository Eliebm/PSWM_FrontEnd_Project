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
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])

  });

  adminLogiForm = new FormGroup({
    adminName: new FormControl(null, [Validators.required]),
    adminPass1: new FormControl(null, [Validators.required]),
    adminPass2: new FormControl(null, [Validators.required])
  });
  get adminNameValid() {
    return this.adminLogiForm.get('adminName');
  }
  get adminPass1Valid() {
    return this.adminLogiForm.get('adminPass1');
  }

  get adminPass2Valid() {
    return this.adminLogiForm.get('adminPass2');
  }


  get nameValid() {
    return this.loginForm.get('name');
  }
  get passwordValid() {
    return this.loginForm.get('password');
  }

  constructor(private auth: AuthService, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {

  }

  memberSubmit() {
    console.log(this.loginForm.value);
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

