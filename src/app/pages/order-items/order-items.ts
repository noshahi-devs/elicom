import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

interface OrderItemModel {
  id: number;
  orderId: number;
  productId: number;
  variantId: number | null;
  quantity: number;
  price: number;
  total: number;
}

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './order-items.html',
  styleUrls: ['./order-items.css']
})
export class OrderItems {
  orderItems: OrderItemModel[] = [
    { id: 1, orderId: 1001, productId: 10, variantId: null, quantity: 2, price: 25, total: 50 },
    { id: 2, orderId: 1001, productId: 11, variantId: 3, quantity: 1, price: 79.99, total: 79.99 }
  ];

  showModal = false;
  editMode = false;
  orderItemModel: OrderItemModel = this.getEmptyOrderItem();

  showConfirmModal = false;
  orderItemToDeleteId: number | null = null;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  searchTerm = '';
  pageSize = 8;
  currentPage = 1;

  getEmptyOrderItem(): OrderItemModel {
    return {
      id: 0,
      orderId: 0,
      productId: 0,
      variantId: null,
      quantity: 1,
      price: 0,
      total: 0
    };
  }

  openModal() {
    this.editMode = false;
    this.orderItemModel = this.getEmptyOrderItem();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editOrderItem(item: OrderItemModel) {
    this.editMode = true;
    this.orderItemModel = { ...item };
    this.showModal = true;
  }

  saveOrderItem() {
    if (!this.orderItemModel.orderId || this.orderItemModel.orderId <= 0) {
      this.showToastMessage('Order ID is required!', 'error');
      return;
    }

    if (!this.orderItemModel.productId || this.orderItemModel.productId <= 0) {
      this.showToastMessage('Product ID is required!', 'error');
      return;
    }

    if (!this.orderItemModel.quantity || this.orderItemModel.quantity <= 0) {
      this.showToastMessage('Quantity must be greater than 0!', 'error');
      return;
    }

    if (this.orderItemModel.price < 0) {
      this.showToastMessage('Price cannot be negative!', 'error');
      return;
    }

    this.orderItemModel.total = this.orderItemModel.quantity * this.orderItemModel.price;

    if (this.editMode) {
      const index = this.orderItems.findIndex(i => i.id === this.orderItemModel.id);
      if (index !== -1) this.orderItems[index] = { ...this.orderItemModel };
      this.showToastMessage('Order item updated successfully!', 'success');
    } else {
      const newId = this.orderItems.length ? Math.max(...this.orderItems.map(i => i.id)) + 1 : 1;
      this.orderItems.push({ ...this.orderItemModel, id: newId });
      this.showToastMessage('Order item added successfully!', 'success');
    }

    this.closeModal();
  }

  deleteOrderItemConfirm(id: number) {
    this.orderItemToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.orderItemToDeleteId !== null) {
      this.orderItems = this.orderItems.filter(i => i.id !== this.orderItemToDeleteId);
      this.showToastMessage('Order item deleted successfully!', 'success');
      this.orderItemToDeleteId = null;
    }

    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.orderItemToDeleteId = null;
    this.showConfirmModal = false;
  }

  filteredOrderItems() {
    const term = this.searchTerm.trim().toLowerCase();

    return this.orderItems.filter(i => {
      if (!term) return true;
      return (
        `${i.id}`.includes(term) ||
        `${i.orderId}`.includes(term) ||
        `${i.productId}`.includes(term) ||
        `${i.variantId ?? ''}`.includes(term)
      );
    });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }
}
