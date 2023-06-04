import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { HunterSheetComponent } from './hunter-sheet.component';

describe('HunterSheetComponent', () => {
  let component: HunterSheetComponent;
  let fixture: ComponentFixture<HunterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HunterSheetComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(HunterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
