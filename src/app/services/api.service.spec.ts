import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { of } from 'rxjs';

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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        {
          provide: HttpClient,
          useValue: {
            get: jasmine.createSpy().and.returnValue(of(mockApiResponse))
          }
        }
      ]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('get()', () => {

    it('should return an Observable<any | any[]>', inject([ApiService], (service: ApiService) => {
      service.get('random').subscribe((data) => {
        expect(data.length).toBe(5);
      });
    }));
  });
});
