import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentModule } from '@features/equipment/equipment.module';
import { MaterialsModule } from '@features/materials/materials.module';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@shared/shared.module';
import { CampaignEditorComponent } from './campaign-editor.component';

describe('CampaignEditorComponent', () => {
  let component: CampaignEditorComponent;
  let fixture: ComponentFixture<CampaignEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignEditorComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        MatIconModule,
        MaterialsModule,
        EquipmentModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
