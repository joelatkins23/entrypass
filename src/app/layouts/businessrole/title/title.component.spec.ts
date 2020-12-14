import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  BusinessroletitleComponent } from './title.component';

describe('BusinessroletitleComponent', () => {
  let component: BusinessroletitleComponent;
  let fixture: ComponentFixture<BusinessroletitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessroletitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessroletitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
