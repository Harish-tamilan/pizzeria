import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PizzacartRoutingModule } from './pizzacart-routing.module';
import { PizzacartComponent } from './pizzacart.component';


@NgModule({
  declarations: [
    PizzacartComponent
  ],
  imports: [
    CommonModule,
    PizzacartRoutingModule
  ],
  exports:[PizzacartComponent]
})
export class PizzacartModule { }
