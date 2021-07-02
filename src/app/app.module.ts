import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RankingComponent } from './ranking/ranking.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { PlayerComponent } from './player/player.component';
import { SearchComponent } from './search/search.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraphPlayerComponent } from './graph-player/graph-player.component';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    PlayerComponent,
    SearchComponent,
    GraphPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzTableModule,
    NzIconModule,
    NzTypographyModule,
    NzButtonModule,
    NzInputModule,
    NzToolTipModule,
    NzListModule,
    NzLayoutModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
