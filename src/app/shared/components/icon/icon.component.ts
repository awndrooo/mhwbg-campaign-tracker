import {
  Component,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [MatTooltip],
})
export class IconComponent {
  @Input('name') appIconName: keyof typeof ICONS | undefined;
  @HostBinding('class') private get _class() {
    return ['app-icon', 'icon-' + this.appIconName];
  }
  @HostListener('mouseover') mouseover() {
    this._tooltip.message = this.appIconName?.toUpperCase() ?? '';
    this._tooltip.show();
  }
  @HostListener('mouseleave') mouseleave() {
    this._tooltip.hide();
  }

  constructor(private _tooltip: MatTooltip) {}
}

export const ICONS = {
  armor: 'mhbg-combo',
  damage: 'mhbg-combo',
  attack: 'mhbg-combo',
  combo: 'mhbg-combo',
};
