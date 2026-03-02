import { Routes } from '@angular/router';
import { HunterSheetComponent } from './hunter-sheet/hunter-sheet.component';

export const routes: Routes = [
  {
    path: 'sheet',
    component: HunterSheetComponent,
  },
  {
    path: '**',
    redirectTo: 'sheet',
  },
];
