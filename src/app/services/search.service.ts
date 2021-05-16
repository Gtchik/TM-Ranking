import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { UserList } from '../models/UserList.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  
   getUserList(
    name: string,
    pageNumber: number=0,
    pageSize: number=8
  ): Observable<UserList[]> {
    const ApiUrl ='http://trackmania-ranking.ml/api/search/'+`${name}`+'/'+`${pageNumber}`+'/'+`${pageSize}`;
    return this.http.get<UserList[] >(`${ApiUrl}`);
   
    
  }

  constructor(private http: HttpClient) {}
}

