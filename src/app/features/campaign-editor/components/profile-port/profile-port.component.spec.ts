import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePortComponent } from './profile-port.component';

describe('ProfilePortComponent', () => {
  let component: ProfilePortComponent;
  let fixture: ComponentFixture<ProfilePortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
