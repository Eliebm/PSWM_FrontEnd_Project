import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataBindingService } from '../dataBinding/user-data-binding.service';
import { Iprovince } from '../Model';

@Component({
  selector: 'pm-add-device-dialog',
  templateUrl: './add-device-dialog.component.html',
  styleUrls: ['./add-device-dialog.component.css']
})
export class AddDeviceDialogComponent implements OnInit {
  districtDisable = false;
  cityDisable = false;
  provinceData: Iprovince[] = [];
  provinceSelectedString: string = '';


  constructor(public dialog: MatDialogRef<AddDeviceDialogComponent>, private _dataBind: UserDataBindingService) { }

  ngOnInit(): void {

    this.getAllProvinces();
  }


  addForm = new FormGroup({
    Name: new FormControl(null, [Validators.required]),
    province: new FormControl(null, [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    building: new FormControl(null, [Validators.required]),

  });


  get NameValidation() {
    return this.addForm.get('Name');

  }
  get provinceValidation() {
    return this.addForm.get('city');
  }
  get districtValidation() {
    return this.addForm.get('city');
  }
  get cityValidation() {
    return this.addForm.get('city');
  }
  get streetValidation() {
    return this.addForm.get('street');
  }
  get buildingValidation() {
    return this.addForm.get('building');
  }


  closeDialoge(): void {
    this.dialog.close();

  }

  getAllProvinces() {
    this._dataBind.fetchProvinces().subscribe(data =>
      this.provinceData = data);

  }


  saveNewData() {

  }
}
