import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'pm-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  standalone: true,
  imports: [HighchartsChartModule]
})
export class ChartsComponent implements OnInit {
  @Input() deviceid: string | undefined;



  binddata = [{
    name: 'Installation & Developers',
    data: [43934, 48656, 65165, 81827, 112143, 142383,
      171533, 165174, 155157, 161454, 154610]
  }, {
    name: 'Manufacturing',
    data: [24916, 37941, 29742, 29851, 32490, 30282,
      38121, 36885, 33726, 34243, 31050]
  }];


  Highcharts = Highcharts;
  linechart: any = {
    series: this.binddata,
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Year Consumption',
    }, xAxis: {
      categories: [],
      accessibility: {
        description: 'Months of the year'
      }
    }, yAxis: {
      title: {
        text: 'litre'
      },

    }
  };
  constructor() { }

  ngOnInit(): void {
    console.log(this.deviceid);
  }

}
