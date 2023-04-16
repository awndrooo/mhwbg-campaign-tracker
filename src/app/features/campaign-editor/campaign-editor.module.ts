import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { EquipmentModule } from '../equipment/equipment.module';
import { MaterialsModule } from '../materials/materials.module';
import { CampaignEditorComponent } from './components/campaign-editor/campaign-editor.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialAddDialogComponent } from './components/material-add-dialog/material-add-dialog.component';
import { AddHunterDialogComponent } from './components/add-hunter-dialog/add-hunter-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignEditorComponent,
  },
];

@NgModule({
  declarations: [NavBarComponent, CampaignEditorComponent, MaterialAddDialogComponent, AddHunterDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    MaterialsModule,
    EquipmentModule,
  ],
})
export class CampaignEditorModule {}
