import { Component, OnInit } from '@angular/core';
import { Player } from '../models/Player.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';


@Component({
  selector: 'app-graph-player',
  templateUrl: './graph-player.component.html',
  styleUrls: ['./graph-player.component.scss']
})
export class GraphPlayerComponent implements OnInit {
  optionsCOTD: any;
  optionsELO: any;
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

  xAxisData: any[] = [];
  cotdResult: any[] = [];
  eloResult: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private playerService: PlayerService ) { }

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
            this.createChart()
          }
        );
      }
    );
  };
  
  updateChart(){
    /*Load data in chart*/

    const reverseResults = this.player.results.reverse()
    for (const result of reverseResults){
        this.cotdResult.push(result.position),
        this.eloResult.push(result.elo)
        this.xAxisData.push(result.tournoi_name.substr(result.tournoi_name.length - 10))
        }
      }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
}

  createChart():void{
    this.optionsCOTD = {
      legend: {
        data: ['cotdResult'],
        align: 'left',
      },
      tooltip: {
        trigger: 'axis',
      },
      dataZoom: [
        {
            id: 'dataZoomX',
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'filter'
        },
        {
            id: 'dataZoomY',
            type: 'inside',
            yAxisIndex: [0],
            filterMode: 'empty'
        }
    ],
      xAxis: {
        data: this.xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type:"value",
        min:0,
        max:(~~(Math.max(...this.cotdResult)/64)+1)*64,
        interval: 64,
        inverse: false,
      },
      series: [
        {
          name: 'COTD',
          type: 'line',
          lineStyle:{ color:"#1890ff" },
          areaStyle: { color:"#1890ff" },
          data: this.cotdResult,
          markPoint: {
            data: [
                {type: 'max'},
                {type: 'min'}
            ]
          }
        },
      ],
      animationEasing: 'cubicInOut',
    },
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  this.optionsELO = {
    legend: {
      data: ['cotdResult'],
      align: 'left',
    },
    tooltip: {
      trigger: 'axis',
    },
    dataZoom: [
      {
          id: 'dataZoomX',
          type: 'inside',
          xAxisIndex: [0],
          filterMode: 'filter'
      },
      {
          id: 'dataZoomY',
          type: 'inside',
          yAxisIndex: [0],
          filterMode: 'empty'
      }
  ],
    xAxis: {
      data: this.xAxisData,
      silent: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type:"value",
      min:Math.min(...this.eloResult),
      max:Math.max(...this.eloResult),
      splitNumber: 5,
      reversed: true,
    },
    series: [
      {
        name: 'ELO',
        type: 'line',
        lineStyle:{ color:"#1890ff" },
        areaStyle: { color:"#1890ff" },
        data: this.eloResult,
        markPoint: {
          data: [
              {type: 'max'},
              {type: 'min'}
          ]
        },
      },
    ],
    animationEasing: 'cubicInOut',
    animationEasingUpdate: 'cubicInOut'
    }
  }
}