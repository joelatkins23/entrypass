import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthtransactionComponent } from './healthtransaction.component';

describe('HealthtransactionComponent', () => {
  let component: HealthtransactionComponent;
  let fixture: ComponentFixture<HealthtransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthtransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
