import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { catchError, delay, Observable, Subscription, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icity, Idaily, Idevice, Idistrict, Inotification, Iprovince, ISignup, IyearsChart } from '../Model';

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
          duration: 4000,

        })

      }

    });


  }

  firstChart(deviceid: any): Observable<IyearsChart[]> {
    var send = { "id": deviceid };
    return this.http.post<IyearsChart[]>(this.apiUrl + 'UserHome/FirstChart()', send).pipe(tap(data => data), catchError(this.handleError));


  }

  yearChart(deviceid: any, yearid: any): Observable<IyearsChart[]> {
    var send = { "year": yearid, "deviceid": deviceid };
    return this.http.post<IyearsChart[]>(this.apiUrl + 'UserHome/ChartByYear()', send).pipe(tap(data => data), catchError(this.handleError));

  }
  percentageYearChart(deviceid: any, yearid: any): Observable<IyearsChart[]> {
    var send = { "year": yearid, "deviceid": deviceid };
    return this.http.post<IyearsChart[]>(this.apiUrl + 'UserHome/PercentageChartByYear()', send).pipe(tap(data => data), catchError(this.handleError));

  }

  averageMonthTurbidityChart(deviceid: any, yearid: any): Observable<IyearsChart[]> {
    var send = { "year": yearid, "deviceid": deviceid };
    return this.http.post<IyearsChart[]>(this.apiUrl + 'UserHome/TurbidityLineChart()', send).pipe(tap(data => data), catchError(this.handleError));
  }

  dailyWaterTurbidityChart(deviceid: any, monthid: any): Observable<IyearsChart[]> {
    var n = monthid.lastIndexOf('-');
    var result = monthid.substring(n + 1);
    var resultyear = monthid.substring(0, n);
    var send = { "deviceid": deviceid, "year": resultyear, "month": result };
    return this.http.post<IyearsChart[]>(this.apiUrl + 'UserHome/MonthWaterTurbidityChart()', send).pipe(tap(data => data), catchError(this.handleError));
  }

  dailyWaterTable(deviceid: any, year: any): Observable<Idaily[]> {
    var send = { "deviceid": deviceid, "year": year };
    return this.http.post<Idaily[]>(this.apiUrl + 'UserHome/DailyWaterData()', send).pipe(tap(data => data), catchError(this.handleError));


  }
  dailyTurbidityTable(deviceid: any, year: any): Observable<Idaily[]> {
    var send = { "deviceid": deviceid, "year": year };
    return this.http.post<Idaily[]>(this.apiUrl + 'UserHome/DailyTurbidityData()', send).pipe(tap(data => data), catchError(this.handleError));


  }

  getmonth(): string {
    var currentyear = new Date().getFullYear();
    var currentmonth = new Date().getMonth() + 1;
    if (currentmonth > 10) {
      var month = currentyear + '-' + currentmonth;
    } else {
      month = currentyear + '-0' + currentmonth
    }
    return month;
  }

  fetchNotificationNumber(deviceid: any): Observable<Inotification[]> {
    var send = { "deviceid": deviceid, "notiftype": "notif" };
    return this.http.post<Inotification[]>(this.apiUrl + 'UserHome/NotificationCount()', send).pipe(tap(data => data), catchError(this.handleError));
  }
  fetchFaultNumber(deviceid: any): Observable<Inotification[]> {
    var send = { "deviceid": deviceid, "notiftype": "fault" };
    return this.http.post<Inotification[]>(this.apiUrl + 'UserHome/NotificationCount()', send).pipe(tap(data => data), catchError(this.handleError));
  }


  loadMessages(deviceid: any, type: any): Observable<Inotification[]> {
    if (type === "notification") {
      type = "notif";
    }
    var send = { "deviceid": deviceid, "notiftype": type };
    return this.http.post<Inotification[]>(this.apiUrl + 'UserHome/FetchMessages()', send).pipe(tap(data => data), catchError(this.handleError));
  }

  DeleteMessages(msgid: any): any {
    var senddata = { "id": msgid };
    this.http.post(this.apiUrl + "UserHome/DeleteMessages()", senddata).subscribe(data => {

      if (data === "1") {
        let snackBarRef = this._snackBar.open("Message Has Been Deleted Successfully", 'Ok', {
          horizontalPosition: "center",
          verticalPosition: "bottom",
          duration: 5000,

        })

      }



    });



  }

  refillAccount(senddata: any) {
    this.http.post(this.apiUrl + "UserHome/RechargeAccount()", senddata).subscribe(data => {

      if (data === "1") {
        let snackBarRef = this._snackBar.open("Account Has Been Refilled Successfully", 'Ok', {
          horizontalPosition: "center",
          verticalPosition: "bottom",


        })

      }
      else if (data === 11) {
        let snackBarRef = this._snackBar.open("Recharge Card Expired", 'Ok', {
          horizontalPosition: "center",
          verticalPosition: "bottom",


        })
      } else if (data === 12) {
        let snackBarRef = this._snackBar.open("Recharge Card Already Used. Try Another One !", 'Ok', {
          horizontalPosition: "center",
          verticalPosition: "bottom",


        })
      } else if (data === 10) {
        let snackBarRef = this._snackBar.open("Unvalid Card Number. Try Another One!", 'Ok', {
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
