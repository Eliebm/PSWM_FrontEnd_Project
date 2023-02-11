import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetailsRoutingModule } from './device-details-routing.module';
import { DeviceDetailsComponent } from './device-details.component';
import { NavbardetailsComponent } from '../navbar/NavbardetailsComponent';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { ChartsComponent } from '../chart/charts/charts.component';
import { Chart2Component } from '../chart/chart2/chart2.component';






@NgModule({
  declarations: [
    DeviceDetailsComponent,
    NavbardetailsComponent,

  ],
  imports: [
    CommonModule,
    DeviceDetailsRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatBadgeModule,

    ChartsComponent,
    Chart2Component,


  ]
})
export class DeviceDetailsModule { }
