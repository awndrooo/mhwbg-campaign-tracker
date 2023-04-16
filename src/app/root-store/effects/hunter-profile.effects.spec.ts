import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HunterProfileEffects } from './hunter-profile.effects';

describe('HunterProfileEffects', () => {
  let actions$: Observable<any>;
  let effects: HunterProfileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HunterProfileEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(HunterProfileEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
