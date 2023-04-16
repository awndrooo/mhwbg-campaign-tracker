import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@app/core/angular-material.module';
import { CounterComponent } from './components/counter/counter.component';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [CounterComponent],
})
export class SharedModule {}
