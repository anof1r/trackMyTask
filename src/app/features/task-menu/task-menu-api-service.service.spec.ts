import { TestBed } from '@angular/core/testing';

import { TaskMenuApiServiceService } from './task-menu-api-service.service';

describe('TaskMenuApiServiceService', () => {
  let service: TaskMenuApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskMenuApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
