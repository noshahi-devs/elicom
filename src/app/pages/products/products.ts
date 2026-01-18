import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuillModule } from 'ngx-quill';

interface ProductModel {
  status: 'Publish' | 'Draft' | 'Archive' | '';
  id: number;
  name: string;
  slug: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  discount: number;
  finalPrice: number;
  maxPrice: number;
  stock: number;
  images: string[];
  category: string;
  seoTitle: string;
  seoDescription: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, QuillModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
  products: ProductModel[] = [];

  showModal: boolean = false;
  editMode: boolean = false;
  productModel: ProductModel = this.getEmptyProduct();

  activeTab: string = 'basic';

  showConfirmModal: boolean = false;
  productToDeleteId: number | null = null;

  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  searchTerm: string = '';
  filterCategory: string = '';
  pageSize: number = 3;
  currentPage: number = 1;
filterStatus: any;

  getEmptyProduct(): ProductModel {
    return {
      id: 0,
      name: '',
      slug: '',
      brand: '',
      description: '',
      shortDescription: '',
      price: 0,
      discount: 0,
      finalPrice: 0,
      maxPrice: 0,
      stock: 0,
      images: [],
      category: '',
      seoTitle: '',
      seoDescription: '',
      status: ''
    };
  }

  openModal() {
    this.editMode = false;
    this.productModel = this.getEmptyProduct();
    this.activeTab = 'basic';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editProduct(product: ProductModel) {
    this.editMode = true;
    this.productModel = { ...product };
    this.activeTab = 'basic';
    this.showModal = true;
  }

  saveProduct() {
    if (!this.productModel.name.trim()) {
      this.showToastMessage('Product name is required!', 'error');
      return;
    }
    if (!this.productModel.status) {
      this.showToastMessage('Status is required!', 'error');
      return;
    }

    this.productModel.price = this.productModel.price ?? 0;
    this.productModel.discount = this.productModel.discount ?? 0;
    this.productModel.finalPrice = this.calculateFinalPrice();
    this.productModel.maxPrice = Math.max(this.productModel.finalPrice, this.productModel.price);

    if (this.editMode) {
      const index = this.products.findIndex(p => p.id === this.productModel.id);
      if (index !== -1) this.products[index] = { ...this.productModel };
      this.showToastMessage('Product updated successfully!', 'success');
    } else {
      const newId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
      this.products.push({ ...this.productModel, id: newId });
      this.showToastMessage('Product added successfully!', 'success');
    }

    this.closeModal();
  }

  deleteProductConfirm(id: number) {
    this.productToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.productToDeleteId !== null) {
      this.products = this.products.filter(p => p.id !== this.productToDeleteId);
      this.showToastMessage('Product deleted successfully!', 'success');
      this.productToDeleteId = null;
    }
    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.productToDeleteId = null;
    this.showConfirmModal = false;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  calculateFinalPrice(): number {
    const price = this.productModel.price ?? 0;
    const discount = this.productModel.discount ?? 0;
    return Math.max(0, price - (price * discount) / 100);
  }

  filteredProducts() {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterCategory ? p.category === this.filterCategory : true)
    );
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.productModel.images.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
}
