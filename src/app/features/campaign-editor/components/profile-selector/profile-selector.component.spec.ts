import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSelectorComponent } from './profile-selector.component';

describe('ProfileSelectorComponent', () => {
  let component: ProfileSelectorComponent;
  let fixture: ComponentFixture<ProfileSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
