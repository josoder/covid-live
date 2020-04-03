import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStatsContainerComponent } from './country-stats-container.component';

describe('CountryStatsContainerComponent', () => {
  let component: CountryStatsContainerComponent;
  let fixture: ComponentFixture<CountryStatsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryStatsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStatsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
