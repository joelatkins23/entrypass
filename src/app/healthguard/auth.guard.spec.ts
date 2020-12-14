import { TestBed, async, inject } from '@angular/core/testing';

import {HealthauthGuard } from './auth.guard';

describe('BusinessauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthauthGuard]
    });
  });

  it('should ...', inject([HealthauthGuard], (guard: HealthauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});