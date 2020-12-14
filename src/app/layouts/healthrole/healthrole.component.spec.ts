import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthroleComponent } from './healthrole.component';

describe('HealthroleComponent', () => {
  let component: HealthroleComponent;
  let fixture: ComponentFixture<HealthroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
