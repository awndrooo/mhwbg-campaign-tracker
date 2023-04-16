import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentAddDialogComponent } from './equipment-add-dialog.component';

describe('EquipmentAddDialogComponent', () => {
  let component: EquipmentAddDialogComponent;
  let fixture: ComponentFixture<EquipmentAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
