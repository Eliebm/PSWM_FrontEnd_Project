import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDeviceDetailsRoutingModule } from './admin-device-details-routing.module';
import { AdminDeviceDetailsComponent } from './admin-device-details.component';
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


@NgModule({
  declarations: [
    AdminDeviceDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminDeviceDetailsRoutingModule,
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
  ]
})
export class AdminDeviceDetailsModule { }
