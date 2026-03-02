import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockRootStore } from '@root-store/provideMockRootStore';
import { CampaignEditorComponent } from './campaign-editor.component';

describe('CampaignEditorComponent', () => {
  let component: CampaignEditorComponent;
  let fixture: ComponentFixture<CampaignEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignEditorComponent],
      providers: [
        provideMockRootStore(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
