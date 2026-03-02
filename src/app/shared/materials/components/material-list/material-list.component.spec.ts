import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { MaterialListComponent } from './material-list.component';

describe('MaterialListComponent', () => {
  let component: MaterialListComponent;
  let fixture: ComponentFixture<MaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialListComponent],
      providers: [provideMockRootStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
