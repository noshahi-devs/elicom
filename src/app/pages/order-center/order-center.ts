import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

type OrderTabStatus = 'All' | 'New' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

interface OrderCenterModel {
  orderId: string;
  productName: string;
  buyerName: string;
  quantity: number;
  amount: number;
  date: Date;
  status: OrderTabStatus;
  shippingAddress: string;
  paymentStatus: 'Released' | 'Pending' | 'Failed';
}

@Component({
  selector: 'app-order-center',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './order-center.html',
  styleUrls: ['./order-center.css']
})
export class OrderCenter {
  pageTitle = 'Order Center';

  activeTab: OrderTabStatus = 'All';

  pageSize = 8;
  currentPage = 1;

  showModal = false;
  selectedOrder: OrderCenterModel | null = null;

  orders: OrderCenterModel[] = [
    {
      orderId: 'UMM-2026-1001',
      productName: 'Wireless Headphones',
      buyerName: 'John Doe',
      quantity: 1,
      amount: 12999,
      date: new Date('2026-01-20'),
      status: 'New',
      shippingAddress: 'Street 1, Lahore, PK',
      paymentStatus: 'Released'
    },
    {
      orderId: 'UMM-2026-1002',
      productName: 'Smart Watch',
      buyerName: 'Adeel Noshahi',
      quantity: 2,
      amount: 18500,
      date: new Date('2026-01-19'),
      status: 'Confirmed',
      shippingAddress: 'Street 2, Islamabad, PK',
      paymentStatus: 'Pending'
    },
    {
      orderId: 'UMM-2026-1003',
      productName: 'Running Shoes',
      buyerName: 'Sara Khan',
      quantity: 1,
      amount: 7200,
      date: new Date('2026-01-18'),
      status: 'Shipped',
      shippingAddress: 'Model Town, Lahore, PK',
      paymentStatus: 'Released'
    },
    {
      orderId: 'UMM-2026-1004',
      productName: 'Bluetooth Speaker',
      buyerName: 'Ali Raza',
      quantity: 3,
      amount: 9900,
      date: new Date('2026-01-16'),
      status: 'Delivered',
      shippingAddress: 'Johar Town, Lahore, PK',
      paymentStatus: 'Released'
    },
    {
      orderId: 'UMM-2026-1005',
      productName: 'Gaming Mouse',
      buyerName: 'Hassan',
      quantity: 1,
      amount: 2500,
      date: new Date('2026-01-15'),
      status: 'Cancelled',
      shippingAddress: 'Gulberg, Lahore, PK',
      paymentStatus: 'Failed'
    }
  ];

  get filteredOrders(): OrderCenterModel[] {
    if (this.activeTab === 'All') return this.orders;
    return this.orders.filter(o => o.status === this.activeTab);
  }

  get countNew() {
    return this.orders.filter(o => o.status === 'New').length;
  }

  get countConfirmed() {
    return this.orders.filter(o => o.status === 'Confirmed').length;
  }

  get countShipped() {
    return this.orders.filter(o => o.status === 'Shipped').length;
  }

  get countDelivered() {
    return this.orders.filter(o => o.status === 'Delivered').length;
  }

  get countCancelled() {
    return this.orders.filter(o => o.status === 'Cancelled').length;
  }

  get currentCount() {
    return this.filteredOrders.length;
  }

  setActiveTab(tab: OrderTabStatus) {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  viewDetails(order: OrderCenterModel) {
    this.selectedOrder = order;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedOrder = null;
  }

  updateStatus(order: OrderCenterModel, status: OrderTabStatus) {
    order.status = status;

    if (status === 'Cancelled') {
      order.paymentStatus = 'Failed';
    }

    if (this.selectedOrder?.orderId === order.orderId) {
      this.selectedOrder = { ...order };
    }
  }
}
