import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsContainerComponent } from './stats-container.component';

describe('StatsContainerComponent', () => {
  let component: StatsContainerComponent;
  let fixture: ComponentFixture<StatsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
