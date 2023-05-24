import { TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MockStore, createMockStore } from '@ngrx/store/testing';
import { MaterialsService } from './materials.service';

describe('MaterialsService', () => {
  let service: MaterialsService;
  let store: MockStore;

  beforeEach(() => {
    store = createMockStore();
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [{ provide: Store, useValue: store }],
    });
    service = TestBed.inject(MaterialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
