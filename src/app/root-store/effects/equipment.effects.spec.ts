import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EquipmentEffects } from './equipment.effects';

describe('EquipmentEffects', () => {
  let actions$: Observable<any>;
  let effects: EquipmentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EquipmentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(EquipmentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
