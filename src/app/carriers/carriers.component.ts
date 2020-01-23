import { Component, OnInit } from '@angular/core';

import { Carrier } from '../carrier';
import { CarriersService } from '../carrier.service';

@Component({
  selector: 'app-carriers',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.css']
})
export class CarriersComponent implements OnInit {
  carriers: Carrier[];

  constructor(private carriersService: CarriersService) { }

  ngOnInit() {
    this.getCarriers();
  }

  getCarriers(): void {
    this.carriersService.getCarriers()
      .subscribe(carriers => this.carriers = carriers);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.carriersService.addCarrier({ name } as Carrier)
      .subscribe(carrier => {
        this.carriers.push(carrier);
      });
  }

  delete(carrier: Carrier): void {
    this.carriers = this.carriers.filter(h => h !== carrier);
    this.carriersService.deleteCarrier(carrier).subscribe();
  }

}