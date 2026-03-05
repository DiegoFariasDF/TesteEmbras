import { TestBed } from '@angular/core/testing';

import { Publicidade } from './publicidade';

describe('Publicidade', () => {
  let service: Publicidade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Publicidade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
