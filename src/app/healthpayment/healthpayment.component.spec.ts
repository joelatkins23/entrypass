import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthpaymentComponent } from './healthpayment.component';

describe('HealthpaymentComponent', () => {
  let component: HealthpaymentComponent;
  let fixture: ComponentFixture<HealthpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
