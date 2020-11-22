import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientbreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: ClientbreadcrumbsComponent;
  let fixture: ComponentFixture<ClientbreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientbreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientbreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
