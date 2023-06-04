import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HunterSheetComponent } from './hunter-sheet/hunter-sheet.component';

const routes: Routes = [
  {
    path: 'sheet',
    component: HunterSheetComponent,
  },
  {
    path: '**',
    redirectTo: 'sheet',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileStatusRoutingModule {}
