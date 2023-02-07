import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pm-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  deviceid: string = "12345";
  constructor() { }
  statusForm = new FormGroup({
    statusSlide: new FormControl(null, [Validators.required])
  }

  );
  ngOnInit(): void {
  }

  get statusSlideValid() {
    return this.statusForm.get('statusSlide');
  }


  turnOn() {
    this.statusSlideValid?.valueChanges.subscribe(newToogleValue => {
      if (newToogleValue === true) {
        console.log("device is on");

      }
      else { console.log("device id off"); }
    });

  }


  message() {
    alert("mesage");
  }
}


