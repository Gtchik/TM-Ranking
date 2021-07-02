import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPlayerComponent } from './graph-player.component';

describe('GraphPlayerComponent', () => {
  let component: GraphPlayerComponent;
  let fixture: ComponentFixture<GraphPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
