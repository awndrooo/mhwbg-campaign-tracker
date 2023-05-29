import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { DbService } from '@app/core/services/db.service';
import { IHunterProfile } from '@app/core/types/HunterProfile';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HunterProfileStoreActions } from '@root-store/actions';
import { hunterProfileFeatureKey } from '@root-store/reducers/hunter-profile.reducer';
import { initialState } from '@root-store/state/hunter-profiles.state';
import { cold, hot } from 'jasmine-marbles';
import { HunterProfileEffects } from './hunter-profile.effects';

const mockHunterProfiles: IHunterProfile[] = [
  {
    campaignDay: 1,
    equipedChestId: null,
    equipedFeetId: null,
    equipedHelmId: null,
    equipedWeaponId: null,
    equipmentCrafted: [],
    hunterId: '04895620-3aeb-4cfa-ad0d-032c71847bee',
    hunterName: 'Hunter Name',
    materials: [],
    notes: '',
    playerName: 'Player Name',
    potions: 1,
  },
];
const mockHunterProfileEntities = mockHunterProfiles.reduce((prev, cur) => {
  prev[cur.hunterId] = cur;
  return prev;
}, {} as { [key: string]: IHunterProfile });

describe('HunterProfileEffects', () => {
  let actions$: Observable<Action>;
  let effects: HunterProfileEffects;
  let dbSpy: jasmine.SpyObj<DbService>;

  beforeEach(() => {
    dbSpy = jasmine.createSpyObj(
      DbService.name,
      Object.getOwnPropertyNames(DbService.prototype)
    );

    TestBed.configureTestingModule({
      providers: [
        HunterProfileEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            [hunterProfileFeatureKey]: {
              ...initialState,
              entities: mockHunterProfileEntities,
              ids: Object.getOwnPropertyNames(mockHunterProfileEntities),
              isLoaded: true,
            },
          },
        }),
        { provide: DbService, useValue: dbSpy },
      ],
      imports: [],
    });

    effects = TestBed.inject(HunterProfileEffects);
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadHunterProfiles$', () => {
    // TODO: Add Test for condition when session variable of active hunter is set

    it('should successfully load profiles', () => {
      actions$ = hot('-a', {
        a: HunterProfileStoreActions.loadHunterProfiles(),
      });
      const expected = hot('---a', {
        a: HunterProfileStoreActions.loadHunterProfilesSuccess({
          data: mockHunterProfiles,
        }),
      });

      dbSpy.GetHunterProfiles.and.returnValue(
        cold('--a', { a: mockHunterProfiles })
      );

      expect(effects.loadHunterProfiles$).toBeObservable(expected);
    });

    it('should return failure', () => {
      actions$ = hot('-a', {
        a: { type: HunterProfileStoreActions.loadHunterProfiles.type },
      });

      const err = new HttpErrorResponse({});
      const expected = hot('---a', {
        a: HunterProfileStoreActions.loadHunterProfilesFailure({
          error: err,
        }),
      });

      dbSpy.GetHunterProfiles.and.returnValue(cold('--#', {}, err));

      expect(effects.loadHunterProfiles$).toBeObservable(expected);
    });
  });

  describe('addHunterProfile$', () => {
    it('should successfully add profile', () => {
      const hunterId = '7de0e53f-3b1d-4d92-bb30-1ad0725a5a7b';
      const profile: IHunterProfile = JSON.parse(
        JSON.stringify(mockHunterProfiles[0])
      );
      profile.hunterId = hunterId;

      actions$ = hot('-a', {
        a: HunterProfileStoreActions.addHunterProfile({ data: profile }),
      });
      const expected = hot('---a', {
        a: HunterProfileStoreActions.addHunterProfileSuccess({
          data: profile,
        }),
      });

      dbSpy.AddHunterProfile.and.returnValue(cold('--a', { a: hunterId }));

      expect(effects.addHunterProfile$).toBeObservable(expected);
    });

    it('should return failure', () => {
      actions$ = hot('-a', {
        a: { type: HunterProfileStoreActions.addHunterProfile.type },
      });

      const err = new DOMException('IDB Error');
      const expected = hot('---a', {
        a: HunterProfileStoreActions.addHunterProfileFailure({
          error: err,
        }),
      });

      dbSpy.AddHunterProfile.and.returnValue(cold('--#', {}, err));

      expect(effects.addHunterProfile$).toBeObservable(expected);
    });
  });

  describe('deleteHunterProfiles$', () => {
    it('should successfully delete profile', () => {
      const hunterId = mockHunterProfiles[0].hunterId;

      actions$ = hot('-a', {
        a: HunterProfileStoreActions.deleteHunterProfile({
          hunterId,
        }),
      });
      const expected = hot('---a', {
        a: HunterProfileStoreActions.deleteHunterProfileSuccess({
          hunterId,
        }),
      });

      dbSpy.DeleteHunterProfile.and.returnValue(
        cold('--a', { a: mockHunterProfiles })
      );

      expect(effects.deleteHunterProfile$).toBeObservable(expected);
    });

    it('should return failure', () => {
      actions$ = hot('-a', {
        a: { type: HunterProfileStoreActions.deleteHunterProfile.type },
      });

      const err = new DOMException('IDB Error');
      const expected = hot('---a', {
        a: HunterProfileStoreActions.deleteHunterProfileFailure({
          error: err,
        }),
      });

      dbSpy.DeleteHunterProfile.and.returnValue(cold('--#', {}, err));

      expect(effects.deleteHunterProfile$).toBeObservable(expected);
    });
  });

  describe('updateHunterProfiles$', () => {
    it('should successfully update profile', () => {
      const profile = mockHunterProfiles[0];

      actions$ = hot('-a', {
        a: HunterProfileStoreActions.updateHunterProfile({
          data: profile,
        }),
      });
      const expected = hot('---a', {
        a: HunterProfileStoreActions.updateHunterProfileSuccess({
          data: profile,
        }),
      });

      dbSpy.UpdateHunterProfile.and.returnValue(
        cold('--a', { a: profile.hunterId })
      );

      expect(effects.updateHunterProfile$).toBeObservable(expected);
    });

    it('should return failure', () => {
      actions$ = hot('-a', {
        a: { type: HunterProfileStoreActions.updateHunterProfile.type },
      });

      const err = new DOMException('IDB Error');
      const expected = hot('---a', {
        a: HunterProfileStoreActions.updateHunterProfileFailure({
          error: err,
        }),
      });

      dbSpy.UpdateHunterProfile.and.returnValue(cold('--#', {}, err));

      expect(effects.updateHunterProfile$).toBeObservable(expected);
    });
  });

  describe('selectHunterProfile$', () => {
    it('should successfully select profile', () => {
      const profile = mockHunterProfiles[0];
      actions$ = hot('-a', {
        a: HunterProfileStoreActions.selectHunterProfile({
          hunterId: profile.hunterId,
        }),
      });
      const expected = hot('-a', {
        a: HunterProfileStoreActions.selectHunterProfileSuccess({
          hunterProfile: profile,
        }),
      });

      expect(effects.selectHunterProfile$).toBeObservable(expected);

      expect(effects['_sessionActiveHunterId']).toBe(profile.hunterId);
    });

    it('should return failure', () => {
      const badHunterId = '994db826-952d-445e-a601-48ab8d297733';
      actions$ = hot('-a', {
        a: HunterProfileStoreActions.selectHunterProfile({
          hunterId: badHunterId,
        }),
      });

      const expected = hot('-a', {
        a: HunterProfileStoreActions.selectHunterProfileFailure({
          hunterId: badHunterId,
        }),
      });

      expect(effects.selectHunterProfile$).toBeObservable(expected);
    });
  });
});
