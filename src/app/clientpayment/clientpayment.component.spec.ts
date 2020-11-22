import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientpaymentComponent } from './clientpayment.component';

describe('ClientpaymentComponent', () => {
  let component: ClientpaymentComponent;
  let fixture: ComponentFixture<ClientpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
