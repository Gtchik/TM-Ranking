import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Player } from '../models/Player.model';
import { PlayerService } from '../services/player.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-graph-player',
  templateUrl: './graph-player.component.html',
  styleUrls: ['./graph-player.component.scss']
})
export class GraphPlayerComponent implements OnInit{
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;

  loading:boolean=true;
  player:Player={
    u_id: '',
    name: '',
    falg: '',
    position: 0,
    evolution: 0,
    elo: 0,
    ave: 0,
    nb_game:0,
    nb_page:0,
    results:[]
    };
  name: string | null='';
  total = 1;
  pageSize = 20;
  pageIndex = 1;  

  constructor(private route: ActivatedRoute, private router: Router, private playerService: PlayerService ) {
    this.chartOptions = {
      series: [
        {
          name: "Result",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Average High & Low Temperature",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month"
        }
      },
      yaxis: {
        title: {
          text: "Rank"
        },
        min: 1,
        max: 500
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,

  ): void {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.playerService.getUserList(params.id,pageIndex,pageSize).subscribe(
          (player) => {
            this.loading = false;
            this.player = player;
            this.updateChart()
          }
        );
      }
    );
  };
  
  updateChart(){
    /*Load data in chart*/
    const dataResult = [];
    const jourCOTD = [];
    const reverseResults = this.player.results.reverse()
    for (const result of reverseResults){
        dataResult.push(result.position),
        jourCOTD.push(result.tournoi_name.substr(result.tournoi_name.length - 10))
        }

    this.chartOptions.series = [{
      data: dataResult
    }];
    this.chartOptions.xaxis = {
      categories: jourCOTD
    }
  };

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

}
