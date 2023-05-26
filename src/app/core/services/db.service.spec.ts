import { TestBed } from '@angular/core/testing';

import { switchMap, tap } from 'rxjs';
import { IHunterProfile } from '../types/HunterProfile';
import { DbService } from './db.service';

describe('DbServiceService', () => {
  let service: DbService;
  const hunterProfile: IHunterProfile = {
    campaignDay: 0,
    equipedChestId: null,
    equipedFeetId: null,
    equipedHelmId: null,
    equipedWeaponId: null,
    equipmentCrafted: [],
    hunterId: '71f8e0a7-47dc-4b5b-89fa-c1981a37534e',
    hunterName: 'Test Hunter',
    materials: [],
    notes: '',
    playerName: 'Hunter Tester',
    potions: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbService);
  });

  afterEach((done) => {
    service
      .DeleteHunterProfile(hunterProfile.hunterId)
      .subscribe((_) => done());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should #AddHunterProfile', (done) => {
    service.AddHunterProfile(hunterProfile).subscribe((hunterId) => {
      expect(hunterId).toEqual(hunterProfile.hunterId);
      done();
    });
  });

  it('should #GetHunterProfiles', (done) => {
    service
      .AddHunterProfile(hunterProfile)
      .pipe(switchMap(() => service.GetHunterProfiles()))
      .subscribe((profiles) => {
        expect(profiles.length).toEqual(1);
        expect(profiles[0]).toEqual(hunterProfile);
        done();
      });
  });

  it('should #GetHunterProfile', (done) => {
    service
      .AddHunterProfile(hunterProfile)
      .pipe(switchMap(() => service.GetHunterProfile(hunterProfile.hunterId)))
      .subscribe((profile) => {
        expect(profile).toEqual(hunterProfile);
        done();
      });
  });

  it('should #UpdateHunterProfile', (done) => {
    const updatedHunter: IHunterProfile = {
      ...hunterProfile,
      campaignDay: 5,
      hunterName: 'Updated Hunter Name',
      notes: 'Sample Notes',
      potions: 2,
      playerName: 'Updated Player Name',
    };
    service
      .AddHunterProfile(hunterProfile)
      .pipe(
        switchMap(() => service.UpdateHunterProfile(updatedHunter)),
        tap((hunterId) => expect(hunterId).toEqual(updatedHunter.hunterId)),
        switchMap((hunterId) => service.GetHunterProfile(hunterId))
      )
      .subscribe((hunterProfile) => {
        expect(hunterProfile).toEqual(updatedHunter);
        done();
      });
  });

  // it('#UpdateHunterProfile should update and')
});
