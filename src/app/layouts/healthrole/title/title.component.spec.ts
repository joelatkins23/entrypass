import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  HealthroletitleComponent } from './title.component';

describe('HealthroletitleComponent', () => {
  let component: HealthroletitleComponent;
  let fixture: ComponentFixture<HealthroletitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthroletitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthroletitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
