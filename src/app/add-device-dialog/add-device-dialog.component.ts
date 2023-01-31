import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataBindingService } from '../dataBinding/user-data-binding.service';
import { Icity, Idistrict, Iprovince } from '../Model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'pm-add-device-dialog',
  templateUrl: './add-device-dialog.component.html',
  styleUrls: ['./add-device-dialog.component.css']
})
export class AddDeviceDialogComponent implements OnInit {
  districtDisable: any;
  cityDisable: any;
  provinceData: Iprovince[] = [];
  provinceSelectedid: any;
  districtSelectedid: any;
  citySelectedid: any;
  districtData: Idistrict[] = [];
  citiesData: Icity[] = [];
  userId: any;


  constructor(public dialog: MatDialogRef<AddDeviceDialogComponent>, private _dataBind: UserDataBindingService, private _auth: AuthService) { }

  ngOnInit(): void {
    this.userId = this._auth.getWebStorageData("user");
    this.cityDisable = true;
    this.districtDisable = true;
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
  provinceSelected(id: any) {

    this._dataBind.fetchDistrict(id).subscribe(data => this.districtData = data);
    this.districtDisable = false;
  }

  selectedDistrict(id: any) {
    this._dataBind.fetchCities(id).subscribe(data => this.citiesData = data);
    this.cityDisable = false;

  }
  saveNewData() {
    var formdata = {
      "id": this.userId, "name": this.NameValidation?.value, "city": this.cityValidation?.value,
      "street": this.streetValidation?.value, "building": this.buildingValidation?.value
    }

    this._dataBind.addNewDevice(formdata);
    this.addForm.reset();
    this.closeDialoge();

  }
}
