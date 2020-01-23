import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Carrier } from './carrier';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const carriers = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return { carriers };
  }

  // Overrides the genId method to ensure that a carrier always has an id.
  // If the carriers array is empty,
  // the method below returns the initial number (11).
  // if the carriers array is not empty, the method below returns the highest
  // carrier id + 1.
  genId(carriers: Carrier[]): number {
    return carriers.length > 0 ? Math.max(...carriers.map(carrier => carrier.id)) + 1 : 11;
  }
}