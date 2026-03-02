import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { environment } from '@env/environment';
import { filter, firstValueFrom, switchMap, tap } from 'rxjs';
import { IHunterProfile } from '../types/HunterProfile';
import { DbService, HUNTER_PROFILE_STORE_NAME } from './db.service';
import { EnvironmentService } from './environment.service';

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
    TestBed.configureTestingModule({
      providers: [
        DbService,
        {
          provide: EnvironmentService,
          useValue: environment,
        },
      ],
    });

    service = TestBed.inject(DbService);
  });

  afterEach(async () => {
    await firstValueFrom(service.DeleteHunterProfile(hunterProfile.hunterId));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create object store on first connect', async () => {
    const db = await new Promise<IDBDatabase>((resolve) => {
      const req = indexedDB.open(environment.IDBName);
      req.onsuccess = () => resolve(req.result);
    });

    expect(db.objectStoreNames.contains(HUNTER_PROFILE_STORE_NAME)).toBe(true);
  });

  it('should #AddHunterProfile', async () => {
    const hunterId = await firstValueFrom(
      service.AddHunterProfile(hunterProfile)
    );
    expect(hunterId).toEqual(hunterProfile.hunterId);
  });

  it('should #GetHunterProfiles', async () => {
    const profiles = await firstValueFrom(
      service.AddHunterProfile(hunterProfile).pipe(
        filter((x) => x != undefined),
        switchMap(() => service.GetHunterProfiles())
      )
    );
    expect(profiles.length).toEqual(1);
    expect(profiles[0]).toEqual(hunterProfile);
  });

  it('should #GetHunterProfile', async () => {
    const profile = await firstValueFrom(
      service
        .AddHunterProfile(hunterProfile)
        .pipe(switchMap(() => service.GetHunterProfile(hunterProfile.hunterId)))
    );
    expect(profile).toEqual(hunterProfile);
  });

  it('should #UpdateHunterProfile', async () => {
    const updatedHunter: IHunterProfile = {
      ...hunterProfile,
      campaignDay: 5,
      hunterName: 'Updated Hunter Name',
      notes: 'Sample Notes',
      potions: 2,
      playerName: 'Updated Player Name',
    };
    const hunterId = await firstValueFrom(
      service.AddHunterProfile(hunterProfile).pipe(
        switchMap(() => service.UpdateHunterProfile(updatedHunter)),
        tap((hunterId) => expect(hunterId).toEqual(updatedHunter.hunterId))
      )
    );
    const dbHunterProfile = await firstValueFrom(
      service.GetHunterProfile(hunterId)
    );
    expect(dbHunterProfile).toEqual(updatedHunter);
  });
});
