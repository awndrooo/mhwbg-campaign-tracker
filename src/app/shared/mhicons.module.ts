import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { EnvironmentService } from '@app/core/services/environment.service';
import { ArmorTypeEnum } from '@app/core/types/ArmorType';
import { WeaponTypeEnum } from '@app/core/types/WeaponType';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule],
})
export class MHIconsModule {
  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _env: EnvironmentService
  ) {
    const icons = [
      {
        iconLabel: 'mh-' + ArmorTypeEnum.Helm,
        url: `${this._env.assets}/mh-icons/Helm_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + ArmorTypeEnum.Arms,
        url: `${this._env.assets}/mh-icons/Arms_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + ArmorTypeEnum.Waist,
        url: `${this._env.assets}/mh-icons/Waist_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + ArmorTypeEnum.Chest,
        url: `${this._env.assets}/mh-icons/Chest_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + ArmorTypeEnum.Legs,
        url: `${this._env.assets}/mh-icons/Legs_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + ArmorTypeEnum.Charm,
        url: `${this._env.assets}/mh-icons/Charm_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.Bow,
        url: `${this._env.assets}/mh-icons/Bow_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.ChargeBlade,
        url: `${this._env.assets}/mh-icons/Charge_Blade_rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.DualBlades,
        url: `${this._env.assets}/mh-icons/Dual_Blades_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.GreatSword,
        url: `${this._env.assets}/mh-icons/Great_Sword_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.GunLance,
        url: `${this._env.assets}/mh-icons/Gunlance_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.Hammer,
        url: `${this._env.assets}/mh-icons/Hammer_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.HeavyBowGun,
        url: `${this._env.assets}/mh-icons/Heavy_Bowgun_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.HuntingHorn,
        url: `${this._env.assets}/mh-icons/Hunting_Horn_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.InsectGlaive,
        url: `${this._env.assets}/mh-icons/Insect_Glaive_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.Lance,
        url: `${this._env.assets}/mh-icons/Lance_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.LightBowGun,
        url: `${this._env.assets}/mh-icons/Light_Bowgun_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.LongSword,
        url: `${this._env.assets}/mh-icons/Long_Sword_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.SwitchAxe,
        url: `${this._env.assets}/mh-icons/Switch_Axe_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-' + WeaponTypeEnum.SwordAndShield,
        url: `${this._env.assets}/mh-icons/Sword_&_Shield_Rank_01.svg`,
      },
    ];
    icons.forEach((icon) =>
      this._matIconRegistry.addSvgIcon(
        icon.iconLabel,
        this._domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
      )
    );
  }
}
