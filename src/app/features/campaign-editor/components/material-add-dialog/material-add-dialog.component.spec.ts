import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { MaterialAddDialogComponent } from './material-add-dialog.component';

describe('MaterialAddDialogComponent', () => {
  let component: MaterialAddDialogComponent;
  let fixture: ComponentFixture<MaterialAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialAddDialogComponent],
      providers: [provideMockRootStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
