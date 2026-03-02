import { inject, NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS } from '@app/core/icons';
import { EnvironmentService } from '@app/core/services/environment.service';
import { RegisterCustomIcons } from '@app/core/utility/RegisterCustomIcons';

@NgModule({
  imports: [MatIconModule],
})
export class MHIconModule {
  private _matIconRegistry = inject(MatIconRegistry);
  private _domSanitizer = inject(DomSanitizer);
  private _env = inject(EnvironmentService);

  constructor() {
    const icons = ICONS.map((x) => ({
      ...x,
      url: x.url.replace('{assetsDir}', this._env.assets),
    }));

    RegisterCustomIcons(icons, this._matIconRegistry, this._domSanitizer);
  }
}
