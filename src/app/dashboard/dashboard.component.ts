import { Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartType, ChartOptions } from 'chart.js';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private reportService: ReportService) { }

  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];
  // public barChartType: any = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   { data: [10, 20, 30, 40], label: 'Stocks' },
  //   { data: [50, 30, 10, 70], label: 'Sales' }
  // ];

  chartData: ChartData<'pie', number[], string> = {
    // labels: ['January', 'February', 'March', 'April'],
    labels: [],
    datasets: [
      {
        // data: [300, 500, 200, 100],
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8BC34A',
          '#E91E63',
          '#2196F3',
          '#FF5722',
          '#795548',
          '#9C27B0',
          '#FF9800',
          '#607D8B',
          '#4CAF50'
        ],
      },
    ],
  }; 

  chartLabels: any = this.chartData.labels;
  chartType: ChartType = 'pie';
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  // chart: any;

  ngOnInit() {
    this.reportService.getStocksByProductCategory().subscribe(
      (data) => {
        this.chartData.datasets[0].data = data.map((item: { quantity_in_stock: string }) => parseInt(item.quantity_in_stock));
        this.chartData.labels = data.map((item: { category_name: string }) => item.category_name);

        // this.chart = new Chart('pieChart', {
        //   type: 'pie',
        //   data: {
        //     labels: chartLabels,
        //     datasets: [
        //       {
        //         data: chartData,
        //         backgroundColor: [
        //           '#FF6384',
        //           '#36A2EB',
        //           '#FFCE56',
        //           '#8BC34A',
        //           '#E91E63',
        //           '#2196F3',
        //           '#FF5722',
        //           '#795548',
        //           '#9C27B0',
        //           '#FF9800',
        //           '#607D8B',
        //           '#4CAF50'
        //         ],
        //       },
        //     ],
        //   },
        //   options: {
        //     responsive: true,
        //   },
        // });       
    },
    (error) => {
      console.log(error);
    }); 
  }
}
