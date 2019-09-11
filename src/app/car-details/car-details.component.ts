import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CarService } from '../services/car.service';
import { Cars } from '../models';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car$: Observable<Cars>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) { }

  public ngOnInit(): void {
    this.car$ = this.route.paramMap.pipe(
     switchMap((params: ParamMap) =>
      this.carService.getFullCarDetails(`vehicle/${params.get('id')}`))
     );
  }

  gotoCars() {
    this.router.navigate(['/cars']);
  }
}
