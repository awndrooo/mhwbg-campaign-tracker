import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/campaign-editor/campaign-editor.module').then(
        (m) => m.CampaignEditorModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile-status/profile-status.module').then(
        (m) => m.ProfileStatusModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
