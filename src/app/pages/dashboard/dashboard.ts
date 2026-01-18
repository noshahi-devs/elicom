import { Component, AfterViewInit, signal } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements AfterViewInit {
  totalOrders = signal(1245);
  totalProducts = signal(320);
  customers = signal(980);
  revenue = signal(45230);
  growthValue = signal(12);
  reviewsValue = signal(48);

  ngAfterViewInit() {
    // Mini charts for cards
    this.createMiniChart('ordersChart', [12, 19, 15, 22, 28, 35], '#ffffff');
    this.createMiniChart('productsChart', [5, 8, 6, 12, 15, 18], '#ffffff');
    this.createMiniChart('customersChart', [10, 15, 13, 20, 22, 30], '#ffffff');
    this.createMiniChart('revenueChart', [100, 150, 140, 200, 260, 310], '#ffffff');
    this.createMiniChart('growthChart', [5, 8, 12, 15, 18, 22], '#ffffff');
    this.createMiniChart('reviewsChart', [8, 12, 10, 15, 18, 20], '#ffffff');

    // Main sales chart
    new Chart('mainSalesChart', {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Sales',
          data: [120, 150, 180, 170, 200, 220],
          backgroundColor: [
            '#00ff99',
            '#00c6ff',
            '#b026ff',
            '#f7971e',
            '#ff6fb5',
            '#00bcd4'
          ],
          borderRadius: 10
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.1)' }, beginAtZero: true }
        }
      }
    });
  }

  createMiniChart(id: string, data: number[], color: string) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: Array(data.length).fill(''),
        datasets: [{
          data,
          borderColor: color,
          borderWidth: 2,
          tension: 0.4,
          fill: false,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  }

  growth() { return this.growthValue(); }
  reviews() { return this.reviewsValue(); }
}
