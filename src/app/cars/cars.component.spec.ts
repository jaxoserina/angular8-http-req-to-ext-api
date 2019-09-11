import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { CarsComponent } from './cars.component';
import { CarService } from '../services/car.service';

const mockApiResponse = [
  {
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
      id: 'xe',
      description: 'The most advanced, efficient and refined sports saloon that Jaguar has ever produced',
      price: '£30,000',
      meta: {
        passengers: 5,
        drivetrain: [
          'AWD',
          'RWD'
        ],
        bodystyles: [
          'saloon'
        ],
        emissions: {
          template: 'CO2 Emissions $value g/km',
          value: 99
        }
      }
    }
  },
  {
    id: 'xf',
    modelYear: 'k17',
    url: '/api/vehicle/xf',
    media: [
      {
        name: 'vehicle',
        url: '/images/xf_k17.jpg'
      }
    ],
    carDetails: {
      id: 'xf',
      description: 'Luxury business saloon with distinctive design, dynamic drive and state-of-the-art technologies.',
      price: '£36,000',
      meta: {
        passengers: 5,
        drivetrain: [
          'AWD',
          'RWD'
        ],
        bodystyles: [
          'saloon'
        ],
        emissions: {
          template: 'CO2 Emissions $value g/km',
          value: 104
        }
      }
    }
  },
  {
    id: 'xj',
    modelYear: 'k16',
    url: '/api/vehicle/xj',
    media: [
      {
        name: 'vehicle',
        url: '/images/xj_k16.jpg'
      }
    ],
    carDetails: {
      id: 'xj',
      description: 'Premium luxury saloon, spacious and beautiful yet powerfully agile.',
      price: '£50,000',
      meta: {
        passengers: 5,
        drivetrain: [
          'AWD',
          'RWD'
        ],
        bodystyles: [
          'saloon (SWB)',
          'saloon (LWB)'
        ],
        emissions: {
          template: 'CO2 Emissions $value g/km',
          value: 149
        }
      }
    }
  },
  {
    id: 'fpace',
    modelYear: 'k17',
    url: '/api/vehicle/fpace',
    media: [
      {
        name: 'vehicle',
        url: '/images/fpace_k17.jpg'
      }
    ],
    carDetails: {
      id: 'fpace',
      description: `Jaguar's luxury performance SUV.`,
      price: '£40,000',
      meta: {
        passengers: 5,
        drivetrain: [
          'AWD',
          'RWD'
        ],
        bodystyles: [
          'SUV'
        ],
        emissions: {
          template: 'CO2 Emissions $value g/km',
          value: 100
        }
      }
    }
  },
  {
    id: 'ftype',
    modelYear: 'k17',
    url: '/api/vehicle/ftype',
    media: [
      {
        name: 'vehicle',
        url: '/images/ftype_k17.jpg'
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
  }
];

describe('CarsComponent', () => {
  let component: CarsComponent;
  let fixture: ComponentFixture<CarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsComponent ],
      providers: [
        CarService,
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
    fixture = TestBed.createComponent(CarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render 5 cars`, async(() => {
    const carsComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(carsComponent.cars.length).toEqual(5);
    expect(fixture.debugElement.queryAll(By.css('div ul li')).length).toBe(5);

  }));

  it(`should render 5 car images`, async(() => {
    const carsComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(carsComponent.cars.length).toEqual(5);
    expect(fixture.debugElement.queryAll(By.css('div ul li img')).length).toBe(5);

  }));

  it(`should render 5 car images`, async(() => {
    const carsComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    const liElement = fixture.debugElement.query(By.css('button'));
    liElement.nativeElement.click();
    expect(carsComponent.router.navigate).toHaveBeenCalled();
    expect(carsComponent.router.navigate).toHaveBeenCalledWith(['/car/xe']);

  }));

});
