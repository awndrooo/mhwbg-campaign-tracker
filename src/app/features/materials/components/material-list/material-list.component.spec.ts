import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialSortPipe } from '@features/materials/pipes/material-sort.pipe';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialListComponent } from './material-list.component';

describe('MaterialListComponent', () => {
  let component: MaterialListComponent;
  let fixture: ComponentFixture<MaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialListComponent, MaterialSortPipe],
      providers: [provideMockStore()],
      imports: [
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
