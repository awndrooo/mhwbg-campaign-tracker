import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentModule } from '@features/equipment/equipment.module';
import { provideMockStore } from '@ngrx/store/testing';
import { MHIconsModule } from '@shared/mhicons.module';
import { OutfitterComponent } from './outfitter.component';

describe('OutfitterComponent', () => {
  let component: OutfitterComponent;
  let fixture: ComponentFixture<OutfitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutfitterComponent, MatIcon],
      providers: [provideMockStore()],
      imports: [
        MatFormFieldModule,
        EquipmentModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MHIconsModule,
        HttpClientTestingModule,
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
