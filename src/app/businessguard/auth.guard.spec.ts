import { TestBed, async, inject } from '@angular/core/testing';

import { BusinessauthGuard } from './auth.guard';

describe('BusinessauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessauthGuard]
    });
  });

  it('should ...', inject([BusinessauthGuard], (guard: BusinessauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});