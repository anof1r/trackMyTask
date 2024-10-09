import { TestBed } from '@angular/core/testing';

import { BoardUiService } from './board-ui.service';

describe('BoardUiService', () => {
  let service: BoardUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
