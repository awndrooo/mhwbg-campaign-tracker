import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore } from '@ngrx/store/testing';
import { EquipmentListComponent } from './equipment-list.component';

describe('EquipmentListComponent', () => {
  let component: EquipmentListComponent;
  let fixture: ComponentFixture<EquipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentListComponent],
      providers: [provideMockStore()],
      imports: [MatListModule, MatTableModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
