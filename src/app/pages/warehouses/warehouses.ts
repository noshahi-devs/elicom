import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WarehouseModel {
  city: string;
  code: string;
  address: string;
  manager: string;
  stockCount: number;
  capacity: number;
}

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warehouses.html',
  styleUrls: ['./warehouses.css']
})
export class Warehouses {
  warehouses: WarehouseModel[] = [
    {
      city: 'Lahore',
      code: 'LHR-01',
      address: 'Johar Town, Lahore, Punjab',
      manager: 'Adeel Noshahi',
      stockCount: 125400,
      capacity: 72
    },
    {
      city: 'Islamabad',
      code: 'ISB-02',
      address: 'Blue Area, Islamabad',
      manager: 'Hassan',
      stockCount: 68400,
      capacity: 49
    },
    {
      city: 'Karachi',
      code: 'KHI-03',
      address: 'Shahrah-e-Faisal, Karachi',
      manager: 'Ali Raza',
      stockCount: 215900,
      capacity: 88
    }
  ];

  getCapacityColor(capacity: number) {
    if (capacity >= 85) return '#ef4444';
    if (capacity >= 60) return '#f7971e';
    return '#10b981';
  }
}
