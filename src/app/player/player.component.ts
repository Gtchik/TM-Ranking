import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzTableQueryParams, NzThMeasureDirective } from 'ng-zorro-antd/table';
import { Player } from '../models/Player.model';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  
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


  constructor( private route: ActivatedRoute, private router: Router, private playerService: PlayerService ) { }

  onNavigate(endpoint: string, id: string) {
    this.router.navigate([endpoint+id]);
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
          }
        );
      }
    );
  }
  
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex, pageSize+1);
  }

  createDelta(index: number,){
    let delta:number = 0
    let nextIndex = index + 1;
    if(nextIndex < this.player.results.length){
      delta = this.player.results[index].elo - this.player.results[nextIndex].elo;
      if(delta > 0){
        return delta
      }
      else if(Math.sign(delta) < 0) {
        return delta
      }
      else if(delta == 0){
        return delta
      }
      else {
        return "err"
      }
    }
    else {
      return delta
    }
  }

  JeSuisCeil(variable: number,){
    return Math.floor(variable)+1;
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('id');
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

}
