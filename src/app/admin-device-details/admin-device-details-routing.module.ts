import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDeviceDetailsComponent } from './admin-device-details.component';

const routes: Routes = [{ path: '', component: AdminDeviceDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDeviceDetailsRoutingModule { }
