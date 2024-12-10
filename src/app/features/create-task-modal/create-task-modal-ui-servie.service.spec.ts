import { TestBed } from '@angular/core/testing';

import { CreateTaskModalUiServieService } from './create-task-modal-ui-servie.service';

describe('CreateTaskModalUiServieService', () => {
  let service: CreateTaskModalUiServieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTaskModalUiServieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
