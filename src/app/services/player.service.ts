import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Player } from '../models/Player.model';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  
   getUserList(
    u_id: string,
    pageNumber: number=0,
    pageSize: number=8
  ): Observable<Player> {
    /*console.log(pageSize);*/
    
    const ApiUrl ='http://trackmania-ranking.ml/api/player/'+`${u_id}`+'/'+`${pageNumber-1}`+'/'+`${pageSize}`;
    return this.http.get<Player >(`${ApiUrl}`);
  }

  constructor(private http: HttpClient) {}
}

