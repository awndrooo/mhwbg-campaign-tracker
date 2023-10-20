import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { MaterialAddComponent } from './components/material-add/material-add.component';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { MaterialSearchComponent } from './components/material-search/material-search.component';
import { MaterialSortPipe } from './pipes/material-sort.pipe';

@NgModule({
  declarations: [
    MaterialSearchComponent,
    MaterialAddComponent,
    MaterialListComponent,
    MaterialSortPipe,
  ],
  imports: [CommonModule, CoreModule],
  exports: [
    MaterialSearchComponent,
    MaterialAddComponent,
    MaterialListComponent,
  ],
})
export class MaterialsModule {}
