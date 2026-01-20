import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

interface ProductVariantModel {
  id: number;
  productId: number;
  sku: string;
  price: number;
  stock: number;
  attributesJson: string;
}

@Component({
  selector: 'app-product-variants',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './product-variants.html',
  styleUrls: ['./product-variants.css']
})
export class ProductVariants {
  variants: ProductVariantModel[] = [
    {
      id: 1,
      productId: 10,
      sku: 'VAR-10-RED',
      price: 29.99,
      stock: 12,
      attributesJson: '{"color":"red","size":"M"}'
    }
  ];

  showModal = false;
  editMode = false;
  variantModel: ProductVariantModel = this.getEmptyVariant();

  showConfirmModal = false;
  variantToDeleteId: number | null = null;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  searchTerm = '';
  pageSize = 8;
  currentPage = 1;

  getEmptyVariant(): ProductVariantModel {
    return {
      id: 0,
      productId: 0,
      sku: '',
      price: 0,
      stock: 0,
      attributesJson: '{}'
    };
  }

  openModal() {
    this.editMode = false;
    this.variantModel = this.getEmptyVariant();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editVariant(v: ProductVariantModel) {
    this.editMode = true;
    this.variantModel = { ...v };
    this.showModal = true;
  }

  saveVariant() {
    if (!this.variantModel.productId || this.variantModel.productId <= 0) {
      this.showToastMessage('Product ID is required!', 'error');
      return;
    }

    if (!this.variantModel.sku.trim()) {
      this.showToastMessage('SKU is required!', 'error');
      return;
    }

    if (this.variantModel.price < 0) {
      this.showToastMessage('Price cannot be negative!', 'error');
      return;
    }

    if (this.variantModel.stock < 0) {
      this.showToastMessage('Stock cannot be negative!', 'error');
      return;
    }

    if (!this.variantModel.attributesJson.trim()) {
      this.variantModel.attributesJson = '{}';
    }

    if (this.editMode) {
      const index = this.variants.findIndex(x => x.id === this.variantModel.id);
      if (index !== -1) this.variants[index] = { ...this.variantModel };
      this.showToastMessage('Variant updated successfully!', 'success');
    } else {
      const newId = this.variants.length ? Math.max(...this.variants.map(x => x.id)) + 1 : 1;
      this.variants.push({ ...this.variantModel, id: newId });
      this.showToastMessage('Variant added successfully!', 'success');
    }

    this.closeModal();
  }

  deleteVariantConfirm(id: number) {
    this.variantToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.variantToDeleteId !== null) {
      this.variants = this.variants.filter(v => v.id !== this.variantToDeleteId);
      this.showToastMessage('Variant deleted successfully!', 'success');
      this.variantToDeleteId = null;
    }
    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.variantToDeleteId = null;
    this.showConfirmModal = false;
  }

  filteredVariants() {
    const term = this.searchTerm.trim().toLowerCase();

    return this.variants.filter(v => {
      if (!term) return true;
      return (
        `${v.id}`.includes(term) ||
        `${v.productId}`.includes(term) ||
        v.sku.toLowerCase().includes(term) ||
        v.attributesJson.toLowerCase().includes(term)
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
