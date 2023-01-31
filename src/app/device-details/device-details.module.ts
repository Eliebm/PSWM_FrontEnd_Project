import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceDetailsRoutingModule } from './device-details-routing.module';
import { DeviceDetailsComponent } from './device-details.component';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    DeviceDetailsComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    DeviceDetailsRoutingModule,


  ]
})
export class DeviceDetailsModule { }
