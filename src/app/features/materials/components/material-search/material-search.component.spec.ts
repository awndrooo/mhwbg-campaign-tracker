import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { MaterialSearchComponent } from './material-search.component';

describe('MaterialSearchComponent', () => {
  let component: MaterialSearchComponent;
  let fixture: ComponentFixture<MaterialSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialSearchComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatListModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
