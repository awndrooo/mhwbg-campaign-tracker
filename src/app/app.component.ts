import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
  ],
})
export class AppComponent {
  private _overlayContainer = inject(OverlayContainer);

  title = 'MHWBGCampaignTracker';

  constructor() {
    this._overlayContainer.getContainerElement().classList.add('darkMode');
  }
}
