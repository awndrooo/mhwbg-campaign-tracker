import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHunterDialogComponent } from './add-hunter-dialog.component';

describe('AddHunterDialogComponent', () => {
  let component: AddHunterDialogComponent;
  let fixture: ComponentFixture<AddHunterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHunterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHunterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
