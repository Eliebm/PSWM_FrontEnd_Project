import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { UserDataBindingService } from 'src/app/dataBinding/user-data-binding.service';
import { Idaily, IyearsChart } from 'src/app/Model';

@Component({
  selector: 'pm-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css'],
  standalone: true,
  imports: [HighchartsChartModule, MatIconModule, MatTooltipModule,
    ReactiveFormsModule, MatButtonModule, FormsModule, MatFormFieldModule, MatSelectModule, CommonModule]
})
export class Chart2Component implements OnInit {
  @Input() deviceid: string | undefined;
  @Input() date: any;

  Highcharts = Highcharts;
  chart: any;
  piechart: any;
  turbiditychart: any;
  dailychart: any;
  currentyear: any = new Date().getFullYear();
  currentMonth: any = 0 + new Date().getMonth() + 1;
  currentDay: any = new Date().getDate();
  month: any = this._databind.getmonth();
  day: any = this.month + '-' + this.currentDay;
  yearselection: any[] = [];
  waterDailyData: Idaily[] = [];
  TurbidityDailyData: Idaily[] = [];
  firstAvailableData: any;
  SecondAvailableData: any;




  constructor(private _databind: UserDataBindingService) {


  }



  ngOnInit(): void {


    this.columnChart(this.currentyear);
    this.pieChart(this.currentyear);
    this.turbidityChart(this.currentyear);
    this.dailyChart(this.selectedMonthValid?.value);
    this.changeday();




  }

  selectyearForm = new FormGroup({
    selectedyear: new FormControl(2023, [Validators.required])
  });
  selectmonthForm = new FormGroup({
    selectedMonth: new FormControl(this.month, [Validators.required])
  });
  selectdayForm = new FormGroup({
    selectedDay: new FormControl(this.day, [Validators.required])
  });


  get selectedyearValid() {
    return this.selectyearForm.get('selectedyear');
  }
  get selectedMonthValid() {
    return this.selectmonthForm.get('selectedMonth');
  }
  get selectedDayValid() {
    return this.selectdayForm.get('selectedDay');
  }


  changechart() {
    this.currentyear = this.selectedyearValid?.value;
    this.columnChart(this.selectedyearValid?.value);
    this.pieChart(this.selectedyearValid?.value);
    this.turbidityChart(this.selectedyearValid?.value);

  }

  changeMonthChart() {

    this.dailyChart(this.selectedMonthValid?.value);

  }

  changeday() {

    this._databind.dailyWaterTable(this.deviceid, this.selectedDayValid?.value).subscribe(data => this.waterDailyData = data);
    this._databind.dailyTurbidityTable(this.deviceid, this.selectedDayValid?.value).subscribe(data => this.TurbidityDailyData = data);

  }

  columnChart(year: any): void {

    this._databind.yearChart(this.deviceid, year).subscribe(data => {
      this.firstAvailableData = data[0].category;
      this.chart = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Monthly Average Water Flow'
        },

        xAxis: {
          categories: data[0].category,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Water Flow (L)'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} Litres </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Water Flow',
          colorByPoint: true,
          data: data[0].water

        }],
        responsive: {
          rules: [{
            chartOptions: {
              legend: {
                enabled: true
              }
            },
            condition: {
              maxWidth: 400
            }
          }]
        }

      }
    });
  }

  pieChart(year: any): void {
    this._databind.percentageYearChart(this.deviceid, year).subscribe(data => {
      data
      this.piechart = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',

        },

        title: {
          text: 'Percentage of Overall Usage',
          align: 'center'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: year,
          colorByPoint: true,
          data: data
        }]
      }
    });
  }

  turbidityChart(year: any): void {
    this._databind.averageMonthTurbidityChart(this.deviceid, year).subscribe(data => {
      data
      this.turbiditychart = {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Monthly Average turbidity'
        },
        xAxis: {
          categories: data[0].category
        },
        yAxis: {
          title: {
            text: 'Turbidity (NTU)'
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: true
          }
        },
        series: [{
          name: year,
          colorByPoint: true,
          data: data[0].turbidity
        }]

      }
    });
  }

  dailyChart(month: any): void {
    this._databind.dailyWaterTurbidityChart(this.deviceid, month).subscribe(data => {
      this.SecondAvailableData = data[0].category

      this.dailychart = {
        chart: {
          zoomType: 'xy'
        },
        title: {
          text: 'Daily Average Water Amount And Turbidity ',
          align: 'center'
        },
        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0
          }
        },
        xAxis: [{
          categories: data[0].category,
          crosshair: true
        }],
        yAxis: [{ // Primary yAxis
          labels: {
            format: '{value} NTU',

          },
          title: {
            text: 'Turbidity',

          }
        }, { // Secondary yAxis
          title: {
            text: 'Water Amount',

          },
          labels: {
            format: '{value} L',

          },
          opposite: true
        }],
        tooltip: {
          shared: true
        },
        legend: {
          align: 'center',

          verticalAlign: 'bottom',

          floating: false,

        },
        series: [{
          name: 'Water Flow',
          type: 'column',
          colorByPoint: true,
          yAxis: 1,
          data: data[0].water,
          tooltip: {
            valueSuffix: ' L'
          }

        }, {
          name: 'Turbidity',
          type: 'spline',
          colorByPoint: true,

          data: data[0].turbidity,
          tooltip: {
            valueSuffix: ' Nephelometric Turbidity Unit (NTU)'
          }
        }],
        responsive: {
          rules: [{
            chartOptions: {
              legend: {
                enabled: true
              }
            },
            condition: {
              maxWidth: 400
            }
          }]
        }
      }
    });
  }



}
