import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/profile-selector/profile-selector.component').then(
        (c) => c.ProfileSelectorComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./components/campaign-editor/campaign-editor.component').then(
        (c) => c.CampaignEditorComponent
      ),
  },
  {
    path: 'outfit',
    loadComponent: () =>
      import('./components/outfitter/outfitter.component').then(
        (c) => c.OutfitterComponent
      ),
  },
  {
    path: 'port',
    loadComponent: () =>
      import('./components/profile-port/profile-port.component').then(
        (c) => c.ProfilePortComponent
      ),
  },
];
