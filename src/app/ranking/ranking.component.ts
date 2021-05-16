
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Raking } from '../models/Racking.model';
import { RakingService } from '../services/raking.service';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  total = 1;
  listOfRaking: Raking[] = [];
  loading = true;
  pageSize = 20;
  pageIndex = 1;
 
  loadDataFromServer(
    pageIndex: number,
    pageSize: number, 
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.rakingService.getRacking(pageIndex, pageSize, sortField, sortOrder).subscribe(data => {
      this.loading = false;
      this.total = 200; // mock the total data here
      this.listOfRaking = data;
      console.log(data);
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private rakingService: RakingService, private router: Router) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }

  onNavigate(endpoint: string, id: string) {
    this.router.navigate([endpoint+id]);
  }

}
