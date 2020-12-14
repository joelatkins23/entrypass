import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesspaymentComponent } from './businesspayment.component';

describe('BusinesspaymentComponent', () => {
  let component: BusinesspaymentComponent;
  let fixture: ComponentFixture<BusinesspaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesspaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesspaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
