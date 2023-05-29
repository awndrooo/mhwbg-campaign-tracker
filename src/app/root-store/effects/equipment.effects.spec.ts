import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@app/core/services/api.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { EquipmentStoreActions } from '@root-store/actions';
import { IEquipmentStoreItem } from '@root-store/state/equipment.state';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
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
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj(
      ApiService.name,
      Object.getOwnPropertyNames(ApiService.prototype)
    );

    TestBed.configureTestingModule({
      providers: [
        EquipmentEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: apiSpy },
      ],
      imports: [],
    });

    effects = TestBed.inject(EquipmentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadEquipments$', () => {
    it('should successfully load equipment', () => {
      actions$ = hot('-a', {
        a: { type: EquipmentStoreActions.loadEquipments.type },
      });
      const expected = hot('---a', {
        a: EquipmentStoreActions.loadEquipmentsSuccess({
          data: mockEquipment,
        }),
      });

      apiSpy.GetEquipment.and.returnValue(cold('--a', { a: mockEquipment }));

      expect(effects.loadEquipments$).toBeObservable(expected);
    });

    it('should return failure', () => {
      actions$ = hot('-a', {
        a: { type: EquipmentStoreActions.loadEquipments.type },
      });

      const err = new HttpErrorResponse({});
      const expected = hot('---a', {
        a: EquipmentStoreActions.loadEquipmentsFailure({
          error: err,
        }),
      });

      apiSpy.GetEquipment.and.returnValue(cold('--#', {}, err));

      expect(effects.loadEquipments$).toBeObservable(expected);
    });
  });
});
