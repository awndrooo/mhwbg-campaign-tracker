import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentModule } from '@features/equipment/equipment.module';
import { provideMockStore } from '@ngrx/store/testing';
import { EquipmentAddDialogComponent } from './equipment-add-dialog.component';

describe('EquipmentAddDialogComponent', () => {
  let component: EquipmentAddDialogComponent;
  let fixture: ComponentFixture<EquipmentAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentAddDialogComponent],
      imports: [MatDialogModule, EquipmentModule, BrowserAnimationsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
