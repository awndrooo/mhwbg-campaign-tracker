import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { EquipmentAddDialogComponent } from './equipment-add-dialog.component';

describe('EquipmentAddDialogComponent', () => {
  let component: EquipmentAddDialogComponent;
  let fixture: ComponentFixture<EquipmentAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentAddDialogComponent],
      providers: [provideMockRootStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
