import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from '../cars/cars.component';
import { CarDetailsComponent } from '../car-details/car-details.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent
  },
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: 'car/:id',
    component: CarDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'cars',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
