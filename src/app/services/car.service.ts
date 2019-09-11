import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from './api.service';
import { Cars, Car } from '../models';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private apiService: ApiService) {
  }

  public getCars(path: string): Observable<Cars[]> {
    return this.apiService.get(`${path}`).pipe(
      mergeMap((cars: Cars[]) =>
        forkJoin(cars.map((item) =>
          this.apiService.get(`vehicle/${item.id}`).pipe(
            map((car: Car) => {
              item.carDetails = car;
              return item;
            })
          )))
      )
    );
  }

  public getCarDetails(path: string): Observable<Car> {
    return this.apiService.get(`${path}`).pipe(
      map((car: Car) => {
        return car;
      })
    );
  }

  public getFullCarDetails(path: string): Observable<Cars> {
    return this.apiService.get(`${path}`).pipe(
      switchMap((car: Car) =>
        this.apiService.get(`vehicles/`).pipe(
          map((cars: Cars[]) => {
            const carInfo = cars.find(item => item.id === car.id);
            carInfo.carDetails = car;
            return carInfo;
          }),
          tap((carDetails: Cars) => carDetails)
        )
      )
    );
  }
}
