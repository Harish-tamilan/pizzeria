import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzacartComponent } from './pizzacart.component';

const routes: Routes = [{ path: '', component: PizzacartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizzacartRoutingModule { }
