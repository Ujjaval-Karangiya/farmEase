import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureStatsComponent } from './agriculture-stats.component';

describe('AgricultureStatsComponent', () => {
  let component: AgricultureStatsComponent;
  let fixture: ComponentFixture<AgricultureStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgricultureStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricultureStatsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
