import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TrackMania';
  inputValue: string | null = null;

  constructor( private router: Router) {}

  onNavigate(endpoint: string, id: string) {
    this.router.navigate([endpoint+id]);
    
  }
}
