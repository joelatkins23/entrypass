import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthdetailComponent } from './healthdetail.component';

describe('HealthdetailComponent', () => {
  let component: HealthdetailComponent;
  let fixture: ComponentFixture<HealthdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
