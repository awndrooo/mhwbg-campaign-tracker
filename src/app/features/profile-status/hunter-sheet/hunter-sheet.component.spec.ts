import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { HunterSheetComponent } from './hunter-sheet.component';

describe('HunterSheetComponent', () => {
  let component: HunterSheetComponent;
  let fixture: ComponentFixture<HunterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HunterSheetComponent],
      providers: [provideMockRootStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(HunterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
