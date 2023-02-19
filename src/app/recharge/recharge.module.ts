import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RechargeRoutingModule } from './recharge-routing.module';
import { RechargeComponent } from './recharge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    RechargeComponent
  ],
  imports: [
    CommonModule,
    RechargeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatStepperModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class RechargeModule { }
