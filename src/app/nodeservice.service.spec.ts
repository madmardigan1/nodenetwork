import { TestBed } from '@angular/core/testing';

import { NodeService } from './nodeservice.service';

describe('NodeserviceService', () => {
  let service: NodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
