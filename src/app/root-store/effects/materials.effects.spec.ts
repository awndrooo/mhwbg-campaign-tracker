import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@app/core/services/api.service';
import { Material } from '@app/core/types/Material';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MaterialStoreActions } from '@root-store/actions';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { MaterialsEffects } from './materials.effects';

const mockMaterials: Material[] = [
  {
    description: 'Material 1',
    id: 'cf4e3c74-ab6f-45bd-8be0-34cc4471bad3',
    name: 'Material 1',
  },
  {
    description: 'Material 2',
    id: '2c1cf009-b094-4882-9b93-3846dbbf9529',
    name: 'Material 2',
  },
];

describe('MaterialsEffects', () => {
  let actions$: Observable<Action>;
  let effects: MaterialsEffects;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj(
      ApiService.name,
      Object.getOwnPropertyNames(ApiService.prototype)
    );

    TestBed.configureTestingModule({
      providers: [
        MaterialsEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: apiSpy },
      ],
      imports: [],
    });

    effects = TestBed.inject(MaterialsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadMaterials$', () => {
    it('should successfully load materials', () => {
      actions$ = hot('-a', {
        a: { type: MaterialStoreActions.loadMaterials.type },
      });
      const expected = hot('---a', {
        a: MaterialStoreActions.loadMaterialsSuccess({
          data: mockMaterials,
        }),
      });

      apiSpy.GetMaterials.and.returnValue(cold('--a', { a: mockMaterials }));

      expect(effects.loadMaterials$).toBeObservable(expected);
    });

    it('should return failure', () => {
      actions$ = hot('-a', {
        a: { type: MaterialStoreActions.loadMaterials.type },
      });

      const err = new HttpErrorResponse({});
      const expected = hot('---a', {
        a: MaterialStoreActions.loadMaterialsFailure({
          error: err,
        }),
      });

      apiSpy.GetMaterials.and.returnValue(cold('--#', {}, err));

      expect(effects.loadMaterials$).toBeObservable(expected);
    });
  });
});
