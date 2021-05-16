import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Raking } from '../models/Racking.model'

@Injectable({ providedIn: 'root' })
export class RakingService {
   getRacking(
    pageIndex: number=0,
    pageSize: number=25,
    sortField: string | null='position',
    sortOrder: string | null='ASC'
  ): Observable< Raking[] > {
    sortOrder = !sortOrder || sortOrder=='ascend' ?'ASC':'DESC';
    const ApiUrl = 'http://trackmania-ranking.ml/api/classement/'+`${pageIndex-1}`+'/'+`${pageSize}`+'/'+`${sortField?sortField:'position'}`+'/'+`${sortOrder}`;
    return this.http.get<Raking[] >(`${ApiUrl}`);
  }

  constructor(private http: HttpClient) {}
}

