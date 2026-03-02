import {
  Component,
  HostBinding,
  HostListener,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MHIconModule } from '@shared/mhicons.module';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, MHIconModule, MatTooltipModule],
  providers: [MatTooltip],
})
export class IconComponent {
  private _tooltip = inject(MatTooltip);

  @Input('name') appIconName: keyof typeof ICONS | undefined;
  @Input('alignment') alignment: 'baseline' | 'center' = 'center';
  @HostBinding('class') private get _class() {
    return ['app-icon', 'icon-' + this.appIconName, 'align-' + this.alignment];
  }
  @HostListener('mouseover') mouseover() {
    this._tooltip.message = this.appIconName?.toUpperCase() ?? '';
    this._tooltip.show();
  }
  @HostListener('mouseleave') mouseleave() {
    this._tooltip.hide();
  }
}

export const ICONS = {
  armor: 'mhbg-combo',
  damage: 'mhbg-combo',
  attack: 'mhbg-combo',
  combo: 'mhbg-combo',
};
