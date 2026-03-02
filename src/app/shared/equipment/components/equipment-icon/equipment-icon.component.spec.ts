import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { EquipmentIconComponent } from './equipment-icon.component';

describe('EquipmentIconComponent', () => {
  let component: EquipmentIconComponent;
  let fixture: ComponentFixture<EquipmentIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
