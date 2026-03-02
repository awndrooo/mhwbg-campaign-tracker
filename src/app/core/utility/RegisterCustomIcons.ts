import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export function RegisterCustomIcons(
  icons: { url: string; iconLabel: string }[],
  _matIconRegistry: MatIconRegistry,
  _domSanitizer: DomSanitizer
) {
  icons.forEach((icon) =>
    _matIconRegistry.addSvgIcon(
      icon.iconLabel,
      _domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
    )
  );
}
