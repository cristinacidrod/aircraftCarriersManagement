import { Component, OnInit } from '@angular/core';
import { Carrier } from '../carrier';
import { CarriersService } from '../carrier.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  carriers: Carrier[] = [];

  constructor(private carrierService: CarriersService) { }

  ngOnInit() {
    this.getCarriers();
  }

  getCarriers(): void {
    this.carrierService.getCarriers().subscribe(carriers => this.carriers = carriers.slice(1, 5));
  }

}