import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  ClientitleComponent } from './title.component';

describe('ClientitleComponent', () => {
  let component: ClientitleComponent;
  let fixture: ComponentFixture<ClientitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
