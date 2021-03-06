import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserList } from '../models/UserList.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  loading:boolean=true;
  userList:UserList[]=[];
  name: string | null='';

  constructor( private route: ActivatedRoute, private router: Router, private searchService: SearchService ) { }

  onNavigate(endpoint: string, id: string) {
    this.router.navigate([endpoint+id]);
  }

  nbOrdinal(number:number){
    if(number == 1 || number == 21 || number == 31){
      return "st"
    }
    else if(number == 2 || number == 22){
      return "nd"
    }
    else if(number == 3 || number == 23){
      return "rd"
    }
    else{
      return "th"
    }
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.route.params.subscribe(
      (params: Params) => {
        this.searchService.getUserList(params.name).subscribe(
          (userList) => {
            this.loading = false;
            this.userList = userList;
          }
        );
      }
    );
  }

}
