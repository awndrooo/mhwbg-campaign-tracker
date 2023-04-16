import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitterComponent } from './outfitter.component';

describe('OutfitterComponent', () => {
  let component: OutfitterComponent;
  let fixture: ComponentFixture<OutfitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutfitterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutfitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
