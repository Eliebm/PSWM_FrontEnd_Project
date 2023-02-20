import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminDataBindingService } from '../dataBinding/admin-data-binding.service';
import { UserDataBindingService } from '../dataBinding/user-data-binding.service';
import { Iadmindevice, Icity, Idevice, Idistrict, Iprovince } from '../Model';

@Component({
  selector: 'pm-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  districtDisable: any;
  cityDisable: any;
  provinceData: Iprovince[] = [];
  provinceSelectedid: any;
  districtSelectedid: any;
  citySelectedid: any;
  districtData: Idistrict[] = [];
  citiesData: Icity[] = [];
  searchString: string = '';
  filteredDeviceData: Iadmindevice[] = [];
  devicesData: Iadmindevice[] = [];


  constructor(private _adminDataBind: AdminDataBindingService) { }

  ngOnInit(): void {

    this.cityDisable = true;
    this.districtDisable = true;
    this.getAllProvinces();

  }

  FetchByCity = new FormGroup({

    province: new FormControl(null, [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),


  });
  get provinceValidation() {
    return this.FetchByCity.get('city');
  }
  get districtValidation() {
    return this.FetchByCity.get('city');
  }
  get cityValidation() {
    return this.FetchByCity.get('city');
  }
  getAllProvinces() {
    this._adminDataBind.adminfetchProvinces().subscribe(data =>
      this.provinceData = data);

  }

  provinceSelected(id: any) {

    this._adminDataBind.adminfetchDistrict(id).subscribe(data => this.districtData = data);
    this.districtDisable = false;
  }

  selectedDistrict(id: any) {
    this._adminDataBind.adminfetchCities(id).subscribe(data => this.citiesData = data);
    this.cityDisable = false;

  }


  SubmitSelection(): void {
    this._adminDataBind.adminfetchAllDevices(this.cityValidation?.value).subscribe(data => this.devicesData = data);
    this._adminDataBind.adminfetchAllDevices(this.cityValidation?.value).subscribe(data => this.filteredDeviceData = data)

  }



  filterBySearch(event: any) {
    this.searchString = event.target.value;

    if (this.searchString === '') {

      this.filteredDeviceData = this.performFilter('');
    }
    this.filteredDeviceData = this.performFilter(this.searchString);

  }


  performFilter(filterBy: string): Iadmindevice[] {

    filterBy = filterBy.toLocaleLowerCase();

    return this.devicesData.filter((device: Iadmindevice) => device.macaddres.toLocaleLowerCase().includes(filterBy) || device.name.toLocaleLowerCase().includes(filterBy))

  }

  deviceDetails(id: any) {
    // location.href = "User/DeviceDetails/" + id;

  }

  logout(): void {
    location.href = "/Login";
  }

}
