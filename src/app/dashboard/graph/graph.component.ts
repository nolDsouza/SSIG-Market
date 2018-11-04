import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { map } from 'rxjs/operators';
import * as $ from './jquery.min';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
CurrentCompany = 'NAB';
key = '(INSERT KEY HERE)';



 constructor(private shareService: ShareService) { }

ngOnInit() {
  let DP = [];
  const chart = new CanvasJS.Chart('chartContainer', {
  animationEnabled: true,
  exportEnabled: true,
  title: {
    fontFamily: 'tahoma',
    text: 'Performance of ' + this.CurrentCompany + ' (100 Days)'
  },
  axisX: {
    valueFormatString: 'DD-MM-YY'
  },
  axisY: {
    valueFormatString: '$#'
  },
  backgroundColor: 'transparent',
  data: [
  {
    type: 'line',
    lineColor: 'red',
    dataPoints: DP,
  }]
  });
  $.getJSON(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY
    &symbol=ASX:${this.CurrentCompany}&outputsize=compact&apikey=${this.shareService.api}`, function(data) {
    $.each(data['Time Series (Daily)'], function(date, value) {
      $.each(data['Time Series (Daily)'][date], function(key, value) {
        if (key === '4. close') {
          DP.push({y: Number(value), x: new Date(date)});
        }
      });
    });
    DP = DP.reverse();
  });
  chart.render();
}
}
