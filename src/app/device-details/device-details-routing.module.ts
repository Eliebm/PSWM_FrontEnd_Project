import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceDetailsComponent } from './device-details.component';

const routes: Routes = [{ path: '', component: DeviceDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceDetailsRoutingModule { }
