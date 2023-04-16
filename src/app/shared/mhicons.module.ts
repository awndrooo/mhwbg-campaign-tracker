import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '@env/environment';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatIconModule],
})
export class MHIconsModule {
  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    const icons = [
      {
        iconLabel: 'mh-helm',
        url: `${environment.assets}/mh-icons/Helm_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-arms',
        url: `${environment.assets}/mh-icons/Arms_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-waist',
        url: `${environment.assets}/mh-icons/Waist_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-chest',
        url: `${environment.assets}/mh-icons/Chest_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-legs',
        url: `${environment.assets}/mh-icons/Legs_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-charm',
        url: `${environment.assets}/mh-icons/Charm_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-BW',
        url: `${environment.assets}/mh-icons/Bow_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-CB',
        url: `${environment.assets}/mh-icons/Charge_Blade_rank_01.svg`,
      },
      {
        iconLabel: 'mh-DB',
        url: `${environment.assets}/mh-icons/Dual_Blades_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-GS',
        url: `${environment.assets}/mh-icons/Great_Sword_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-GL',
        url: `${environment.assets}/mh-icons/Gunlance_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-HA',
        url: `${environment.assets}/mh-icons/Hammer_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-HBG',
        url: `${environment.assets}/mh-icons/Heavy_Bowgun_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-HH',
        url: `${environment.assets}/mh-icons/Hunting_Horn_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-IG',
        url: `${environment.assets}/mh-icons/Insect_Glaive_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-LA',
        url: `${environment.assets}/mh-icons/Lance_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-LBG',
        url: `${environment.assets}/mh-icons/Light_Bowgun_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-LS',
        url: `${environment.assets}/mh-icons/Long_Sword_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-SA',
        url: `${environment.assets}/mh-icons/Switch_Axe_Rank_01.svg`,
      },
      {
        iconLabel: 'mh-SS',
        url: `${environment.assets}/mh-icons/Sword_&_Shield_Rank_01.svg`,
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
