import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@app/core/services/api.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { EquipmentStoreActions } from '@root-store/actions';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import type { MockedObject } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EquipmentEffects } from './equipment.effects';

const mockEquipment: IEquipmentStoreItem[] = [
  {
    equipmentType: 'Armor',
    armorType: 'helm',
    cardNumber: 1,
    description: 'description',
    id: 'c0744601-76a0-419e-a56e-a7edb433f7a9',
    name: 'name',
    note: '',
    rarity: 'white',
    armorValue: 1,
  },
];

describe('EquipmentEffects', () => {
  let actions$: Observable<Action>;
  let effects: EquipmentEffects;
  let apiMock: MockedObject<ApiService>;

  beforeEach(() => {
    apiMock = Object.fromEntries(
      Object.getOwnPropertyNames(ApiService.prototype)
        .filter((prop) => prop !== 'constructor')
        .map((prop) => [prop, vi.fn()])
    ) as unknown as MockedObject<ApiService>;

    TestBed.configureTestingModule({
      providers: [
        EquipmentEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: apiMock },
      ],
    });

    effects = TestBed.inject(EquipmentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadEquipments$', () => {
    it('should successfully load equipment', () => {
      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });

      ts.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', {
          a: { type: EquipmentStoreActions.loadEquipments.type },
        });

        apiMock.GetEquipment.mockReturnValue(cold('--a', { a: mockEquipment }));

        expectObservable(effects.loadEquipments$).toBe('---a', {
          a: EquipmentStoreActions.loadEquipmentsSuccess({
            data: mockEquipment,
          }),
        });
      });
    });

    it('should return failure', () => {
      const ts = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });

      ts.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', {
          a: { type: EquipmentStoreActions.loadEquipments.type },
        });

        const err = new HttpErrorResponse({});

        apiMock.GetEquipment.mockReturnValue(cold('--#', {}, err));

        expectObservable(effects.loadEquipments$).toBe('---a', {
          a: EquipmentStoreActions.loadEquipmentsFailure({
            error: err,
          }),
        });
      });
    });
  });
});
