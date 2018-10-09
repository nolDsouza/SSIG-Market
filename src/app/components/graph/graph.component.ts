import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { map } from 'rxjs/operators';
import * as $ from './jquery.min';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
CurrentCompany = "ASX";
key = "(INSERT KEY HERE)";



 constructor() { }

ngOnInit() {
	let DP = [];
	let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		
		title: {
			fontFamily: "tahoma",
			text: "Performance of " + this.CurrentCompany + " (100 Days)"
		},
		axisX:{
			valueFormatString: "DD-MM-YY"
		},
		axisY:{
			valueFormatString: "$#"
		},
		backgroundColor: "transparent",
		
		data:[
		{
			type: "line",
			lineColor: "red",
			dataPoints: DP,
		}]
	});
		
	$.getJSON('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ASX:'+this.CurrentCompany+'&outputsize=compact&apikey='+ this.key,function(data){
		$.each(data["Time Series (Daily)"],function(date,value){
			$.each(data["Time Series (Daily)"][date],function(key,value){
				if (key == "4. close"){
					DP.push({y: Number(value), x:new Date(date)});
				}
			});
		});
		DP = DP.reverse();
	});
	chart.render(); 		
}
}

