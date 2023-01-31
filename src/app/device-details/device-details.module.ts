import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceDetailsRoutingModule } from './device-details-routing.module';
import { DeviceDetailsComponent } from './device-details.component';


@NgModule({
  declarations: [
    DeviceDetailsComponent
  ],
  imports: [
    CommonModule,
    DeviceDetailsRoutingModule
  ]
})
export class DeviceDetailsModule { }
