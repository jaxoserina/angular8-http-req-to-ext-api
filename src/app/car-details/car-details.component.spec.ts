import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { CarDetailsComponent } from './car-details.component';
import { CarService } from '../services/car.service';

const mockApiResponse = [{
  id: 'xe',
  modelYear: 'k17',
  url: '/api/vehicle/xe',
  media: [
    {
      name: 'vehicle',
      url: '/images/xe_k17.jpg'
    }
  ],
  carDetails: {
    id: 'ftype',
    description: 'Pulse-quickening, pure Jaguar sports car.',
    price: '£60,000',
    meta: {
      passengers: 2,
      drivetrain: [
        'AWD',
        'RWD'
      ],
      bodystyles: [
        'COUPÉ',
        'CONVERTIBLE'
      ],
      emissions: {
        template: 'CO2 Emissions $value g/km',
        value: 234
      }
    }
  }
}];


describe('CarDetailsComponent', () => {
  let component: CarDetailsComponent;
  let fixture: ComponentFixture<CarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ CarDetailsComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: new BehaviorSubject({ get: jasmine.createSpy() })
          }
        },
        {
          provide: CarService,
          useValue: {
            getFullCarDetails: jasmine.createSpy().and.returnValue(of(mockApiResponse[0]))
          }
        },
        {
          provide: HttpClient,
          useValue: {
            get: jasmine.createSpy().and.returnValue(of(mockApiResponse))
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy().and.returnValue(of(null))
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render car data`, async(() => {
    const carsComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(carsComponent.car$).toBeDefined();

  }));

  it(`should call carService to fetch car data`, async(() => {
    const carsComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(carsComponent.carService.getFullCarDetails).toHaveBeenCalled();

  }));

  it(`should go back to the list of cars on clicking the back button`, async(() => {
    const carsComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    const backButtonElement = fixture.debugElement.query(By.css('button'));
    backButtonElement.nativeElement.click();
    expect(carsComponent.router.navigate).toHaveBeenCalled();
    expect(carsComponent.router.navigate).toHaveBeenCalledWith(['/cars']);

  }));

});
