import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@app/core/services/api.service';
import { Material } from '@app/core/types/Material';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MaterialStoreActions } from '@root-store/actions';
import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedObject,
} from 'vitest';
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
  let apiSpy: MockedObject<ApiService>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    apiSpy = Object.fromEntries(
      Object.getOwnPropertyNames(ApiService.prototype)
        .filter((prop) => prop !== 'constructor')
        .map((prop) => [prop, vi.fn()])
    ) as unknown as MockedObject<ApiService>;
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).deep.equal(expected);
    });

    TestBed.configureTestingModule({
      providers: [
        MaterialsEffects,
        provideMockRootStore(),
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
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', {
          a: { type: MaterialStoreActions.loadMaterials.type },
        });

        apiSpy.GetMaterials.mockReturnValue(cold('--a', { a: mockMaterials }));

        expectObservable(effects.loadMaterials$).toBe('---a', {
          a: MaterialStoreActions.loadMaterialsSuccess({
            data: mockMaterials,
          }),
        });
      });
    });

    it('should return failure', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', {
          a: { type: MaterialStoreActions.loadMaterials.type },
        });

        const err = new HttpErrorResponse({});

        apiSpy.GetMaterials.mockReturnValue(cold('--#', {}, err));

        expectObservable(effects.loadMaterials$).toBe('---a', {
          a: MaterialStoreActions.loadMaterialsFailure({
            error: err,
          }),
        });
      });
    });
  });
});
