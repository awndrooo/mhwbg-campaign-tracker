import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedObject,
} from 'vitest';

import { HttpErrorResponse } from '@angular/common/http';
import { DbService } from '@app/core/services/db.service';
import { IHunterProfile } from '@app/core/types/HunterProfile';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { HunterProfileStoreActions } from '@root-store/actions';
import { hunterProfileFeatureKey } from '@root-store/reducers/hunter-profile.reducer';
import { initialState } from '@root-store/state/hunter-profiles.state';
import { TestScheduler } from 'rxjs/testing';
import { HunterProfileEffects } from './hunter-profile.effects';

const mockHunterProfiles: IHunterProfile[] = [
  {
    campaignDay: 1,
    equipedChestId: null,
    equipedFeetId: null,
    equipedHelmId: null,
    equipedWeaponId: null,
    equipmentCrafted: [],
    hunterId: '04895620-3aeb-4cfa-ad0d-032c71847bec',
    hunterName: 'Hunter Name',
    materials: [],
    notes: '',
    playerName: 'Player Name',
    potions: 1,
  },
];
const mockHunterProfileEntities = mockHunterProfiles.reduce(
  (prev, cur) => {
    prev[cur.hunterId] = cur;
    return prev;
  },
  {} as {
    [key: string]: IHunterProfile;
  }
);

describe('HunterProfileEffects', () => {
  let actions$: Observable<Action>;
  let effects: HunterProfileEffects;
  let dbSpy: MockedObject<DbService>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    dbSpy = Object.fromEntries(
      Object.getOwnPropertyNames(DbService.prototype)
        .filter((prop) => prop !== 'constructor')
        .map((prop) => [prop, vi.fn()])
    ) as unknown as MockedObject<DbService>;
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).deep.equal(expected);
    });

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
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', {
          a: HunterProfileStoreActions.loadHunterProfiles(),
        });

        dbSpy.GetHunterProfiles.mockReturnValue(
          cold('--a', { a: mockHunterProfiles })
        );

        expectObservable(effects.loadHunterProfiles$).toBe('---a', {
          a: HunterProfileStoreActions.loadHunterProfilesSuccess({
            data: mockHunterProfiles,
          }),
        });
      });
    });

    it('should return failure', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', {
          a: { type: HunterProfileStoreActions.loadHunterProfiles.type },
        });

        const err = new HttpErrorResponse({});

        dbSpy.GetHunterProfiles.mockReturnValue(cold('--#', {}, err));

        expectObservable(effects.loadHunterProfiles$).toBe('---a', {
          a: HunterProfileStoreActions.loadHunterProfilesFailure({
            error: err,
          }),
        });
      });
    });
  });

  describe('addHunterProfile$', () => {
    it('should successfully add profile', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const hunterId = '7de0e53f-3b1d-4d92-bb30-1ad0725a5a7b';
        const profile: IHunterProfile = JSON.parse(
          JSON.stringify(mockHunterProfiles[0])
        );
        profile.hunterId = hunterId;

        actions$ = hot('-a', {
          a: HunterProfileStoreActions.addHunterProfile({ data: profile }),
        });

        dbSpy.AddHunterProfile.mockReturnValue(cold('--a', { a: hunterId }));

        expectObservable(effects.addHunterProfile$).toBe('---a', {
          a: HunterProfileStoreActions.addHunterProfileSuccess({
            data: profile,
          }),
        });
      });
    });

    it('should return failure', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', {
          a: { type: HunterProfileStoreActions.addHunterProfile.type },
        });

        const err = new DOMException('IDB Error');

        dbSpy.AddHunterProfile.mockReturnValue(cold('--#', {}, err));

        expectObservable(effects.addHunterProfile$).toBe('---a', {
          a: HunterProfileStoreActions.addHunterProfileFailure({
            error: err,
          }),
        });
      });
    });
  });

  describe('deleteHunterProfiles$', () => {
    it('should successfully delete profile', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const hunterId = mockHunterProfiles[0].hunterId;

        actions$ = hot('-a', {
          a: HunterProfileStoreActions.deleteHunterProfile({
            hunterId,
          }),
        });
        dbSpy.DeleteHunterProfile.mockReturnValue(cold('--a', { a: true }));

        expectObservable(effects.deleteHunterProfile$).toBe('---a', {
          a: HunterProfileStoreActions.deleteHunterProfileSuccess({
            hunterId,
          }),
        });
      });
    });

    it('should return failure', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', {
          a: { type: HunterProfileStoreActions.deleteHunterProfile.type },
        });

        const err = new DOMException('IDB Error');

        dbSpy.DeleteHunterProfile.mockReturnValue(cold('--#', {}, err));

        expectObservable(effects.deleteHunterProfile$).toBe('---a', {
          a: HunterProfileStoreActions.deleteHunterProfileFailure({
            error: err,
          }),
        });
      });
    });
  });

  describe('updateHunterProfiles$', () => {
    it('should successfully update profile', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const profile = mockHunterProfiles[0];

        actions$ = hot('-a', {
          a: HunterProfileStoreActions.updateHunterProfile({
            data: profile,
          }),
        });

        dbSpy.UpdateHunterProfile.mockReturnValue(
          cold('--a', { a: profile.hunterId })
        );

        expectObservable(effects.updateHunterProfile$).toBe('---a', {
          a: HunterProfileStoreActions.updateHunterProfileSuccess({
            data: profile,
          }),
        });
      });
    });

    it('should return failure', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', {
          a: { type: HunterProfileStoreActions.updateHunterProfile.type },
        });

        const err = new DOMException('IDB Error');

        dbSpy.UpdateHunterProfile.mockReturnValue(cold('--#', {}, err));

        expectObservable(effects.updateHunterProfile$).toBe('---a', {
          a: HunterProfileStoreActions.updateHunterProfileFailure({
            error: err,
          }),
        });
      });
    });
  });

  describe('selectHunterProfile$', () => {
    it('should successfully select profile', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const profile = mockHunterProfiles[0];
        actions$ = hot('-a', {
          a: HunterProfileStoreActions.selectHunterProfile({
            hunterId: profile.hunterId,
          }),
        });

        expectObservable(effects.selectHunterProfile$).toBe('-a', {
          a: HunterProfileStoreActions.selectHunterProfileSuccess({
            hunterProfile: profile,
          }),
        });
      });
    });

    it('should return failure', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const badHunterId = '994db826-952d-445e-a601-48ab8d297733';
        actions$ = hot('-a', {
          a: HunterProfileStoreActions.selectHunterProfile({
            hunterId: badHunterId,
          }),
        });

        expectObservable(effects.selectHunterProfile$).toBe('-a', {
          a: HunterProfileStoreActions.selectHunterProfileFailure({
            hunterId: badHunterId,
          }),
        });
      });
    });
  });
});
