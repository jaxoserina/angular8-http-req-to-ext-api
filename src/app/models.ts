export class Cars {
  id: string;
  modelYear: string;
  url: string;
  media: CarDetails[];
  carDetails: Car;
}

interface CarDetails {
  name: string;
  url: string;
}

export class Car {
  id: string;
  description: string;
  price: string;
  meta: CarData;
}

interface CarData {
  passengers: number;
  drivetrain: string[];
  bodystyles: string[];
  emissions: EmissionsData;
}

interface EmissionsData {
  template: string;
  value: number;
}


