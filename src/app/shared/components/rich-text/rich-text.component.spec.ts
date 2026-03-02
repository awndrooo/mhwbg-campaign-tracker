import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { ElementRef } from '@angular/core';
import { RichTextComponent } from './rich-text.component';

class MockElementRef extends ElementRef {
  constructor() {
    super(undefined);
  }
  override nativeElement = document.createElement('div');
}

describe('RichTextComponent', () => {
  let component: RichTextComponent;
  let fixture: ComponentFixture<RichTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextComponent],
      providers: [
        {
          provide: ElementRef,
          useValue: MockElementRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RichTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
