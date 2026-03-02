import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { MaterialSearchComponent } from './material-search.component';

describe('MaterialSearchComponent', () => {
  let component: MaterialSearchComponent;
  let fixture: ComponentFixture<MaterialSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialSearchComponent],
      providers: [provideMockRootStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
