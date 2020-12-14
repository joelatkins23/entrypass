import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittermComponent } from './editterm.component';

describe('EdittermComponent', () => {
  let component: EdittermComponent;
  let fixture: ComponentFixture<EdittermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
