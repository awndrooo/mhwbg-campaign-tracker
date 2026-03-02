import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { EMPTY, Observable } from 'rxjs';
import { ProfilePortComponent } from './profile-port.component';

describe('ProfilePortComponent', () => {
  let component: ProfilePortComponent;
  let fixture: ComponentFixture<ProfilePortComponent>;
  const actions$: Observable<unknown> = EMPTY;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePortComponent],
      providers: [provideMockRootStore(), provideMockActions(() => actions$)],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
