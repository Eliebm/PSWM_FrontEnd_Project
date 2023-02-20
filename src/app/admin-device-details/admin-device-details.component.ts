import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { AdminDataBindingService } from '../dataBinding/admin-data-binding.service';
import { UserDataBindingService } from '../dataBinding/user-data-binding.service';
import { Iadmindevice, Idaily, Idevice } from '../Model';

@Component({
  selector: 'pm-admin-device-details',
  templateUrl: './admin-device-details.component.html',
  styleUrls: ['./admin-device-details.component.css']
})
export class AdminDeviceDetailsComponent implements OnInit {
  deviceid: any;
  deviceDetails: Iadmindevice[] = [];
  chart2Date: any;
  datepicker: any;
  faultnumber: any;
  notinumber: any;
  hidefault: boolean = false;
  hidenotif: boolean = false;
  currentDay: any = new Date().getDate();
  month: any = this._databind.getmonth();
  day: any = this.month + '-' + this.currentDay;
  waterDailyData: Idaily[] = [];
  TurbidityDailyData: Idaily[] = [];

  constructor(private _admindatabind: AdminDataBindingService, private _route: ActivatedRoute, private _databind: UserDataBindingService) { }

  ngOnInit(): void {
    this.deviceid = this._route.snapshot.paramMap.get('deviceid');
    this.fetchdevicedetails();
    this.changeday();
  }
  selectdayForm = new FormGroup({
    selectedDay: new FormControl(this.day, [Validators.required])
  });
  statusForm = new FormGroup({
    statusSlide: new FormControl(null, [Validators.required])
  });

  get statusSlideValid() {
    return this.statusForm.get('statusSlide');
  }
  get selectedDayValid() {
    return this.selectdayForm.get('selectedDay');
  }

  fetchdevicedetails() {
    this._admindatabind.adminfetchDeviceDetails(this.deviceid).subscribe(data => this.deviceDetails = data);

  }

  turnOn(value: MatSlideToggleChange): void {
    if (value.checked === true) {
      this._admindatabind.adminturnDeviceOnOff(this.deviceid, "true");
    }
    else { this._admindatabind.adminturnDeviceOnOff(this.deviceid, "false"); }
    this.fetchdevicedetails();


  }
  changeday() {

    this._databind.dailyWaterTable(this.deviceid, this.selectedDayValid?.value).subscribe(data => this.waterDailyData = data);
    this._databind.dailyTurbidityTable(this.deviceid, this.selectedDayValid?.value).subscribe(data => this.TurbidityDailyData = data);

  }
  logout(): void {
    location.href = "/Login";

  }
}
