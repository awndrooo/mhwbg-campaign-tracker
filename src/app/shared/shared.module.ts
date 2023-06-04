import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@app/core/angular-material.module';
import { CounterComponent } from './components/counter/counter.component';
import { IconComponent } from './components/icon/icon.component';
import { RichTextComponent } from './components/rich-text/rich-text.component';

@NgModule({
  declarations: [CounterComponent, IconComponent, RichTextComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [CounterComponent, IconComponent, RichTextComponent],
})
export class SharedModule {}
