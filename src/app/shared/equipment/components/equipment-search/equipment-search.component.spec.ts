import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { EquipmentSearchComponent } from './equipment-search.component';

describe('EquipmentSearchComponent', () => {
  let component: EquipmentSearchComponent;
  let fixture: ComponentFixture<EquipmentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentSearchComponent],
      providers: [provideMockRootStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
