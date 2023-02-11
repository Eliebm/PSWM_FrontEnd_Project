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
import { IyearsChart } from 'src/app/Model';

@Component({
  selector: 'pm-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css'],
  standalone: true,
  imports: [HighchartsChartModule, MatIconModule, MatTooltipModule,
    ReactiveFormsModule, MatButtonModule, FormsModule, MatFormFieldModule, MatSelectModule]
})
export class Chart2Component implements OnInit {
  @Input() deviceid: string | undefined;
  @Input() date: any;

  Highcharts = Highcharts;
  chart: any;
  piechart: any;
  turbiditychart: any;
  currentyear: any;
  yearselection: any[] = [];


  constructor(private _databind: UserDataBindingService) { }



  ngOnInit(): void {
    this.currentyear = new Date().getFullYear();

    this.columnChart(2023);
    this.pieChart(2023);
    this.turbidityChart(2023);



  }

  selectyearForm = new FormGroup({
    selectedyear: new FormControl(2023, [Validators.required])
  });

  get selectedyearValid() {
    return this.selectyearForm.get('selectedyear');
  }

  changechart() {
    this.columnChart(this.selectedyearValid?.value);
    this.pieChart(this.selectedyearValid?.value);
    this.turbidityChart(this.selectedyearValid?.value);
  }


  columnChart(year: any): void {

    this._databind.yearChart(this.deviceid, year).subscribe(data => {
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
}
