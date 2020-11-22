import { TestBed, async, inject } from '@angular/core/testing';

import { ClientauthGuard } from './auth.guard';

describe('ClientauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientauthGuard]
    });
  });

  it('should ...', inject([ClientauthGuard], (guard: ClientauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});