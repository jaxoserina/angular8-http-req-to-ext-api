import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { CarService } from './car.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Cars, Car } from '../models';

interface SetupParams {
  mockApiGetPromise?: Promise<any>;
}
interface SetupReturnType {

  mockCars?: Cars[];
  mockCarDetails?: Car;
  mockFullCarDetails?: Cars;
  carService: CarService;
  mockApiService: jasmine.SpyObj<ApiService>;
}

function setup(params: SetupParams = {}): SetupReturnType {
  const carService = TestBed.get(CarService);
  const mockApiService = TestBed.get(ApiService);


  if (params && params.mockApiGetPromise) {
    mockApiService.get.and.returnValue(params.mockApiGetPromise);
  }

  const mockCars = [
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

  const mockCarDetails = {
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
  };

  const mockFullCarDetails = {
    id:  'xe',
    modelYear:  'k17',
    url:  '/api/vehicle/xe',
    media:  [
      {
        name:  'vehicle',
        url:  '/images/xe_k17.jpg'
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
  };

  return {
    mockCars,
    mockCarDetails,
    mockFullCarDetails,
    carService,
    mockApiService
  };
}

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:  [
        {
          provide:  ApiService,
          useValue:  {
            get:  jasmine.createSpy('get')
          }
        },
        {
          provide:  HttpClient,
          useValue:  {
            get:  jasmine.createSpy()
          }
        }
      ]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCars()', () => {

    it('should return an Observable<Cars[]>', async () => {

      const { carService, mockApiService, mockCars } = setup();
      (mockApiService.get as jasmine.Spy).and.returnValue(of(mockCars));
      const actualResult = await carService.getCars('allcars').toPromise();
      expect(actualResult).toEqual(mockCars);

    });
  });

  describe('getCarDetails()', () => {

    it('should return an Observable<Car>', async () => {

      const { carService, mockApiService, mockCarDetails } = setup();
      (mockApiService.get as jasmine.Spy).and.returnValue(of(mockCarDetails));
      const actualResult = await carService.getCarDetails('124').toPromise();
      expect(actualResult).toEqual(mockCarDetails);

    });
  });

  describe('getFullCarDetails()', () => {

    it('should return an Observable<Cars>', async () => {

      const { carService, mockApiService, mockCars, mockCarDetails, mockFullCarDetails } = setup();
      (mockApiService.get as jasmine.Spy).and.returnValues(of(mockCarDetails), of(mockCars));
      const actualResult = await carService.getFullCarDetails('123').toPromise();
      expect(actualResult).toEqual(mockFullCarDetails);
      expect(mockApiService.get.calls.count()).toEqual(2);

    });
  });

});
