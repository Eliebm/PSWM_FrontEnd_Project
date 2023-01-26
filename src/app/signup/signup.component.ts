import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ISignup } from '../Model';

@Component({
  selector: 'pm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  emailValue: string = "Email Address";

  constructor(private _auth: AuthService) { }

  firstFormGroup = new FormGroup({
    accountname: new FormControl(null, [Validators.required])
  });

  secondFormGroup = new FormGroup({
    fname: new FormControl(null, [Validators.required]),
    lname: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("961-00-000000")]),
  });

  thirdFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.nullValidator]),
    password: new FormControl(null, [Validators.required])

  });



  ngOnInit(): void {

  }
  get accountnameValid() {
    return this.firstFormGroup.get('accountname');
  }

  get fnameValid() {

    return this.secondFormGroup.get('fname');
  }
  get lnameValid() {

    return this.secondFormGroup.get('lname');
  }
  get phoneValid() {

    return this.secondFormGroup.get('phone');
  }
  get emailValid() {

    return this.thirdFormGroup.get('email');


  }
  get passwordValid() {
    return this.thirdFormGroup.get('password');
  }


  submit(): void {
    var senddata = {
      "account": this.accountnameValid?.value,
      "name": this.fnameValid?.value,
      "lname": this.lnameValid?.value,
      "phone": this.phoneValid?.value,
      "email": this.emailValid?.value,
      "pass": this.passwordValid?.value
    };

    this._auth.userSignup(senddata);
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
  }


}
