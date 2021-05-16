import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { RankingComponent } from './ranking/ranking.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
 { path: '', component:RankingComponent },
 { path: 'player/:id', component:PlayerComponent },
 { path: 'search/:name', component:SearchComponent },
 { path: 'search',  redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
