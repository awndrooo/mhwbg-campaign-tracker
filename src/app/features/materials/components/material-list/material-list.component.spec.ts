import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialListComponent } from './material-list.component';

describe('MaterialListComponent', () => {
  let component: MaterialListComponent;
  let fixture: ComponentFixture<MaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialListComponent],
      providers: [provideMockStore()],
      imports: [MatDialogModule, MatTableModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
