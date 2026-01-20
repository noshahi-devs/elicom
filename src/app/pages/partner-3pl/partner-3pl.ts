import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type PartnerStatus = 'Active' | 'Inactive';

interface PartnerModel {
  name: string;
  integrated: boolean;
  status: PartnerStatus;
  successRate: number;
  avgDeliveryTime: string;
}

@Component({
  selector: 'app-partner-3pl',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner-3pl.html',
  styleUrls: ['./partner-3pl.css']
})
export class Partner3pl {
  partners: PartnerModel[] = [
    {
      name: 'TCS',
      integrated: true,
      status: 'Active',
      successRate: 96,
      avgDeliveryTime: '2-3 Days'
    },
    {
      name: 'Leopards',
      integrated: true,
      status: 'Inactive',
      successRate: 91,
      avgDeliveryTime: '3-4 Days'
    },
    {
      name: 'DHL',
      integrated: false,
      status: 'Inactive',
      successRate: 0,
      avgDeliveryTime: ''
    },
    {
      name: 'FedEx',
      integrated: false,
      status: 'Inactive',
      successRate: 0,
      avgDeliveryTime: ''
    }
  ];

  connectPartner(partner: PartnerModel) {
    partner.integrated = true;
    partner.status = 'Active';
    partner.successRate = this.randomInt(90, 99);
    partner.avgDeliveryTime = `${this.randomInt(1, 3)}-${this.randomInt(3, 5)} Days`;
  }

  toggleStatus(partner: PartnerModel) {
    partner.status = partner.status === 'Active' ? 'Inactive' : 'Active';
  }

  private randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
