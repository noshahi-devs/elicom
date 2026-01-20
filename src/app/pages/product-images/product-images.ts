import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

interface ProductImageModel {
  id: number;
  productId: number;
  image: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './product-images.html',
  styleUrls: ['./product-images.css']
})
export class ProductImages {
  images: ProductImageModel[] = [
    { id: 1, productId: 10, image: 'products/sample-1.png', isDefault: true },
    { id: 2, productId: 10, image: 'products/sample-2.png', isDefault: false }
  ];

  showModal = false;
  editMode = false;
  imageModel: ProductImageModel = this.getEmptyImage();

  showConfirmModal = false;
  imageToDeleteId: number | null = null;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  searchTerm = '';
  pageSize = 8;
  currentPage = 1;

  getEmptyImage(): ProductImageModel {
    return { id: 0, productId: 0, image: '', isDefault: false };
  }

  openModal() {
    this.editMode = false;
    this.imageModel = this.getEmptyImage();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editImage(img: ProductImageModel) {
    this.editMode = true;
    this.imageModel = { ...img };
    this.showModal = true;
  }

  saveImage() {
    if (!this.imageModel.productId || this.imageModel.productId <= 0) {
      this.showToastMessage('Product ID is required!', 'error');
      return;
    }

    if (!this.imageModel.image.trim()) {
      this.showToastMessage('Image path is required!', 'error');
      return;
    }

    if (this.imageModel.isDefault) {
      this.images = this.images.map(i =>
        i.productId === this.imageModel.productId ? { ...i, isDefault: false } : i
      );
    }

    if (this.editMode) {
      const index = this.images.findIndex(i => i.id === this.imageModel.id);
      if (index !== -1) this.images[index] = { ...this.imageModel };
      this.showToastMessage('Image updated successfully!', 'success');
    } else {
      const newId = this.images.length ? Math.max(...this.images.map(i => i.id)) + 1 : 1;
      this.images.push({ ...this.imageModel, id: newId });
      this.showToastMessage('Image added successfully!', 'success');
    }

    this.closeModal();
  }

  deleteImageConfirm(id: number) {
    this.imageToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.imageToDeleteId !== null) {
      this.images = this.images.filter(i => i.id !== this.imageToDeleteId);
      this.showToastMessage('Image deleted successfully!', 'success');
      this.imageToDeleteId = null;
    }

    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.imageToDeleteId = null;
    this.showConfirmModal = false;
  }

  filteredImages() {
    const term = this.searchTerm.trim().toLowerCase();
    return this.images.filter(i => {
      if (!term) return true;
      return (
        `${i.id}`.includes(term) ||
        `${i.productId}`.includes(term) ||
        i.image.toLowerCase().includes(term)
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
