import { TestBed } from '@angular/core/testing';

import { TaskMenuUiServiceService } from './task-menu-ui-service.service';

describe('TaskMenuUiServiceService', () => {
  let service: TaskMenuUiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskMenuUiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
