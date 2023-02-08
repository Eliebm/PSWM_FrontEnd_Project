import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icity, Idevice, Idistrict, Iprovince, ISignup } from '../Model';

@Injectable({
  providedIn: 'root'
})
export class UserDataBindingService {
  private apiUrl = environment.baseUrl;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  fetchProvinces(): Observable<Iprovince[]> {

    return this.http.post<Iprovince[]>(this.apiUrl + 'UserHome/GetAllProvinces()', {})
      .pipe(tap(data => data)
        , catchError(this.handleError));

  }

  fetchDistrict(id: any): Observable<Idistrict[]> {
    var data = { 'Id': id };
    return this.http.post<Idistrict[]>(this.apiUrl + 'UserHome/GetAllDistricts()', data)
      .pipe(tap(data => data), catchError(this.handleError));

  }

  fetchCities(id: any): Observable<Icity[]> {
    var data = { 'Id': id }
    return this.http.post<Icity[]>(this.apiUrl + 'UserHome/GetAllCities()', data)
      .pipe(tap(data => data), catchError(this.handleError));

  }

  fetchUserInfos(id: any): Observable<ISignup[]> {
    var data = { 'account': id }
    return this.http.post<ISignup[]>(this.apiUrl + 'UserHome/FetchUserData()', data).pipe(tap(data => data), catchError(this.handleError));



  }

  addNewDevice(senddata: any) {

    this.http.post(this.apiUrl + "UserHome/AddNewDevice()", senddata).subscribe(data => {
      if (data === 1) {

        this._snackBar.open("New Device Has Been  Added Successfully", 'Ok', {
          horizontalPosition: "center",
          verticalPosition: "bottom",
          duration: 1000,

        })

      }
    });


  }

  fetchAllDevices(userid: any): Observable<Idevice[]> {
    var send = { "id": userid }

    return this.http.post<Idevice[]>(this.apiUrl + 'UserHome/FetchUserDevices()', send).pipe(tap(data => data), catchError(this.handleError));


  }

  fetchDeviceDetails(deviceid: any): Observable<Idevice[]> {
    var send = { "id": deviceid }
    return this.http.post<Idevice[]>(this.apiUrl + 'UserHome/FetchDeviceDetails()', send).pipe(tap(data => data), catchError(this.handleError));

  }

  turnDeviceOnOff(deviceid: any, userstatus: any) {
    var send = { "id": deviceid, "userstatus": userstatus };
    this.http.post(this.apiUrl + "userHome/TurndeviceOnOff()", send).subscribe(data => {
      if (data === "1") {
        this._snackBar.open("Device status has changed", 'Ok', {
          horizontalPosition: "center",
          verticalPosition: "bottom",

        })

      }

    });


  }



  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error occured : ${err.error.message}';

    }
    else {
      errorMessage = 'Server returned code: ${err.status}, error message is : ${err.message}';

    }
    console.error(errorMessage);
    return throwError(() => errorMessage)
  }
}
