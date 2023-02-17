import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', redirectTo: 'Login', pathMatch: 'full' },
{ path: 'Login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
{ path: 'User/Home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
{ path: 'Admin/Home', loadChildren: () => import('./admin-home/admin-home.module').then(m => m.AdminHomeModule) },
{ path: 'User/Signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
{ path: 'User/DeviceDetails/:deviceid', loadChildren: () => import('./device-details/device-details.module').then(m => m.DeviceDetailsModule) },
{ path: 'Admin/DeviceDetails/:deviceid', loadChildren: () => import('./device-details/device-details.module').then(m => m.DeviceDetailsModule) },
{ path: 'Notification/:device/:type', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
