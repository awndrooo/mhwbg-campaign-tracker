import { TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have defined properties', () => {
    expect(service.ApiHost).toBeDefined();
    expect(service.IDBName).toBeDefined();
    expect(service.IDBVersion).toBeDefined();
    expect(service.assets).toBeDefined();
    expect(service.production).toBeDefined();
  });
});
