import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { EnvironmentService } from '@app/core/services/environment.service';

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
        iconLabel: 'mh-helm',
        url: `${this._env.assets}/mh-icons/Helm_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-arms',
        url: `${this._env.assets}/mh-icons/Arms_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-waist',
        url: `${this._env.assets}/mh-icons/Waist_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-chest',
        url: `${this._env.assets}/mh-icons/Chest_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-legs',
        url: `${this._env.assets}/mh-icons/Legs_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-charm',
        url: `${this._env.assets}/mh-icons/Charm_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-BW',
        url: `${this._env.assets}/mh-icons/Bow_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-CB',
        url: `${this._env.assets}/mh-icons/Charge_Blade_rank_01.svg`,
      },
      {
        iconLabel: 'mh-DB',
        url: `${this._env.assets}/mh-icons/Dual_Blades_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-GS',
        url: `${this._env.assets}/mh-icons/Great_Sword_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-GL',
        url: `${this._env.assets}/mh-icons/Gunlance_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-HA',
        url: `${this._env.assets}/mh-icons/Hammer_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-HBG',
        url: `${this._env.assets}/mh-icons/Heavy_Bowgun_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-HH',
        url: `${this._env.assets}/mh-icons/Hunting_Horn_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-IG',
        url: `${this._env.assets}/mh-icons/Insect_Glaive_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-LA',
        url: `${this._env.assets}/mh-icons/Lance_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-LBG',
        url: `${this._env.assets}/mh-icons/Light_Bowgun_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-LS',
        url: `${this._env.assets}/mh-icons/Long_Sword_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-SA',
        url: `${this._env.assets}/mh-icons/Switch_Axe_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-SS',
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
