import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/campaign-editor/campaign-editor.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile-status/profile-status.routes').then(
        (m) => m.routes
      ),
  },
];
