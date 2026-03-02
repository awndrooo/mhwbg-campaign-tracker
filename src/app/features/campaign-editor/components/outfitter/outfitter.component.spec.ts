import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { OutfitterComponent } from './outfitter.component';

describe('OutfitterComponent', () => {
  let component: OutfitterComponent;
  let fixture: ComponentFixture<OutfitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitterComponent],
      providers: [
        provideMockRootStore(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OutfitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
