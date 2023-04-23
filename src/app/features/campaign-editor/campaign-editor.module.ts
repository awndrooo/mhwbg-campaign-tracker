import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@shared/shared.module';
import { EquipmentModule } from '../equipment/equipment.module';
import { MaterialsModule } from '../materials/materials.module';
import { AddHunterDialogComponent } from './components/add-hunter-dialog/add-hunter-dialog.component';
import { CampaignEditorComponent } from './components/campaign-editor/campaign-editor.component';
import { EquipmentAddDialogComponent } from './components/equipment-add-dialog/equipment-add-dialog.component';
import { MaterialAddDialogComponent } from './components/material-add-dialog/material-add-dialog.component';
import { OutfitterComponent } from './components/outfitter/outfitter.component';
import { ProfilePortComponent } from './components/profile-port/profile-port.component';
import { ProfileSelectorComponent } from './components/profile-selector/profile-selector.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileSelectorComponent,
  },
  {
    path: 'edit',
    component: CampaignEditorComponent,
  },
  {
    path: 'outfit',
    component: OutfitterComponent,
  },
  {
    path: 'port',
    component: ProfilePortComponent,
  },
];

@NgModule({
  declarations: [
    CampaignEditorComponent,
    MaterialAddDialogComponent,
    AddHunterDialogComponent,
    EquipmentAddDialogComponent,
    OutfitterComponent,
    ProfileSelectorComponent,
    ProfilePortComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    MaterialsModule,
    SharedModule,
    EquipmentModule,
    ReactiveFormsModule,
  ],
})
export class CampaignEditorModule {}
