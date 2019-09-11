import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Cars, Car } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  private cars: Cars[] = [];

  constructor(
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carService.getCars('vehicles/').subscribe((cars: Cars[]) => {
      this.cars = cars;
    });
  }

  goToCarDetails(car: Car) {
    this.router.navigate([`/car/${car.id}`]);
  }


}
