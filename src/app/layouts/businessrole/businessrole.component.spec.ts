import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessroleComponent } from "./businessrole.component";

describe('BusinessroleComponent', () => {
  let component: BusinessroleComponent;
  let fixture: ComponentFixture<BusinessroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
