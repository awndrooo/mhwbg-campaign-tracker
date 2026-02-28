import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentModule } from '@features/equipment/equipment.module';
import { MaterialsModule } from '@features/materials/materials.module';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@shared/shared.module';
import { CampaignEditorComponent } from './campaign-editor.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CampaignEditorComponent', () => {
  let component: CampaignEditorComponent;
  let fixture: ComponentFixture<CampaignEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CampaignEditorComponent, MatIcon],
    imports: [MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        MaterialsModule,
        EquipmentModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconTestingModule],
    providers: [provideMockStore(), provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(CampaignEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
