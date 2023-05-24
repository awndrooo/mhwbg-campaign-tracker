import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from '@features/materials/materials.module';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialAddDialogComponent } from './material-add-dialog.component';

describe('MaterialAddDialogComponent', () => {
  let component: MaterialAddDialogComponent;
  let fixture: ComponentFixture<MaterialAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialAddDialogComponent],
      imports: [
        MatIconModule,
        MatDialogModule,
        MaterialsModule,
        MatDividerModule,
        BrowserAnimationsModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
