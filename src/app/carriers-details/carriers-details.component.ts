import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Carrier } from '../carrier';
import { CarriersService } from '../carrier.service';

@Component({
  selector: 'app-carriers-details',
  templateUrl: './carriers-details.component.html',
  styleUrls: ['./carriers-details.component.css']
})
export class CarriersDetailsComponent implements OnInit {
  @Input() carrier: Carrier;

  constructor(
    private route: ActivatedRoute,
    private carrierService: CarriersService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCarrier();
  }

  getCarrier(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.carrierService.getCarrier(id)
      .subscribe(carrier => this.carrier = carrier);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.carrierService.updateCarrier(this.carrier)
      .subscribe(() => this.goBack());
  }
}