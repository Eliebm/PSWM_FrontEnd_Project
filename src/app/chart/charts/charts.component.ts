import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { UserDataBindingService } from 'src/app/dataBinding/user-data-binding.service';


@Component({
  selector: 'pm-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  standalone: true,
  imports: [HighchartsChartModule]
})
export class ChartsComponent implements OnInit {
  @Input() deviceid: string | undefined;

  Highcharts = Highcharts;

  linechart: any;
  binddata: any;






  constructor(private _databind: UserDataBindingService) { }

  ngOnInit(): void {
    console.log(this.deviceid);

    this.yearchart();
  }


  yearchart(): void {
    this._databind.firstChart(this.deviceid).subscribe(data => {
      data

      this.linechart = {
        chart: {
          zoomType: 'xy'
        },
        title: {
          text: 'Yearly Average  Water Amount And Turbidity ',
          align: 'center'
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
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
