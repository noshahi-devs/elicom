import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'verification'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'rejected';

type PaymentStatus = 'paid' | 'pending' | 'failed' | '';

type PaymentMethod = 'uberpay' | 'cod' | 'bank' | '';

type ShippingMethod = 'pickup' | 'warehouse' | '';

interface OrderModel {
  id: number;
  userId: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  trackingNumber: string;
  createdAt: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders {
  orders: OrderModel[] = [
    {
      id: 1001,
      userId: 1,
      total: 129.99,
      status: 'pending',
      paymentStatus: 'paid',
      paymentMethod: 'uberpay',
      shippingMethod: 'warehouse',
      trackingNumber: 'TRK-1001',
      createdAt: '2026-01-20'
    },
    {
      id: 1002,
      userId: 2,
      total: 59.5,
      status: 'processing',
      paymentStatus: 'pending',
      paymentMethod: 'cod',
      shippingMethod: 'pickup',
      trackingNumber: 'TRK-1002',
      createdAt: '2026-01-19'
    }
  ];

  showModal = false;
  editMode = false;

  orderModel: OrderModel = this.getEmptyOrder();

  showConfirmModal = false;
  orderToDeleteId: number | null = null;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  searchTerm = '';
  filterStatus: OrderStatus | '' = '';
  pageSize = 5;
  currentPage = 1;

  getEmptyOrder(): OrderModel {
    return {
      id: 0,
      userId: 0,
      total: 0,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'uberpay',
      shippingMethod: 'warehouse',
      trackingNumber: '',
      createdAt: ''
    };
  }

  openModal() {
    this.editMode = false;
    this.orderModel = this.getEmptyOrder();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editOrder(order: OrderModel) {
    this.editMode = true;
    this.orderModel = { ...order };
    this.showModal = true;
  }

  saveOrder() {
    if (!this.orderModel.userId || this.orderModel.userId <= 0) {
      this.showToastMessage('User ID is required!', 'error');
      return;
    }

    if (!this.orderModel.total || this.orderModel.total <= 0) {
      this.showToastMessage('Total must be greater than 0!', 'error');
      return;
    }

    if (!this.orderModel.status) {
      this.showToastMessage('Status is required!', 'error');
      return;
    }

    if (!this.orderModel.trackingNumber.trim()) {
      this.orderModel.trackingNumber = this.generateTrackingNumber();
    }

    if (!this.orderModel.createdAt.trim()) {
      this.orderModel.createdAt = this.today();
    }

    if (this.editMode) {
      const index = this.orders.findIndex(o => o.id === this.orderModel.id);
      if (index !== -1) this.orders[index] = { ...this.orderModel };
      this.showToastMessage('Order updated successfully!', 'success');
    } else {
      const newId = this.orders.length ? Math.max(...this.orders.map(o => o.id)) + 1 : 1;
      this.orders.push({ ...this.orderModel, id: newId });
      this.showToastMessage('Order added successfully!', 'success');
    }

    this.closeModal();
  }

  deleteOrderConfirm(id: number) {
    this.orderToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.orderToDeleteId !== null) {
      this.orders = this.orders.filter(o => o.id !== this.orderToDeleteId);
      this.showToastMessage('Order deleted successfully!', 'success');
      this.orderToDeleteId = null;
    }
    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.orderToDeleteId = null;
    this.showConfirmModal = false;
  }

  filteredOrders() {
    const term = this.searchTerm.trim().toLowerCase();

    return this.orders.filter(o => {
      const matchesText =
        !term ||
        `${o.id}`.includes(term) ||
        `${o.userId}`.includes(term) ||
        o.trackingNumber.toLowerCase().includes(term);

      const matchesStatus = this.filterStatus ? o.status === this.filterStatus : true;

      return matchesText && matchesStatus;
    });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }

  private generateTrackingNumber() {
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `TRK-${rand}`;
  }

  private today() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
