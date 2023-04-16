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
import { MaterialAddDialogComponent } from './components/material-add-dialog/material-add-dialog.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EquipmentAddDialogComponent } from './components/equipment-add-dialog/equipment-add-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignEditorComponent,
  },
];

@NgModule({
  declarations: [
    NavBarComponent,
    CampaignEditorComponent,
    MaterialAddDialogComponent,
    AddHunterDialogComponent,
    EquipmentAddDialogComponent,
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
