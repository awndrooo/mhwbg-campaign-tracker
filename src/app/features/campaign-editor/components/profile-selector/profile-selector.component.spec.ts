import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { Subject } from 'rxjs';
import { ProfileSelectorComponent } from './profile-selector.component';

describe('ProfileSelectorComponent', () => {
  let component: ProfileSelectorComponent;
  let fixture: ComponentFixture<ProfileSelectorComponent>;
  let actions$: Subject<Action>;

  beforeEach(async () => {
    actions$ = new Subject<Action>();

    await TestBed.configureTestingModule({
      imports: [ProfileSelectorComponent],
      providers: [
        provideMockRootStore(),
        provideMockActions(() => actions$.asObservable()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
