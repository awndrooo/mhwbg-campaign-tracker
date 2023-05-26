import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MHIconsModule } from '@shared/mhicons.module';
import { EquipmentIconComponent } from './equipment-icon.component';

describe('EquipmentIconComponent', () => {
  let component: EquipmentIconComponent;
  let fixture: ComponentFixture<EquipmentIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentIconComponent, MatIcon],
      imports: [MHIconsModule, MatIconTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
