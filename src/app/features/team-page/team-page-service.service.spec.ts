import { TestBed } from '@angular/core/testing';

import { TeamPageServiceService } from './team-page-service.service';

describe('TeamPageServiceService', () => {
  let service: TeamPageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamPageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
