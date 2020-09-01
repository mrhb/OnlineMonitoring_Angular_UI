import { TestBed } from '@angular/core/testing';

import { UsersPermitsService } from './users-permits.service';

describe('UsersPermitsService', () => {
  let service: UsersPermitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersPermitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
