import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

interface CategoryModel {
  id: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class Category {
  categories: CategoryModel[] = [
    { id: 1, name: 'Electronics', status: 'active' },
    { id: 2, name: 'Clothing', status: 'inactive' },
    { id: 3, name: 'Shoes', status: 'active' },
    { id: 4, name: 'Books', status: 'active' },
    { id: 5, name: 'Sports', status: 'inactive' },
  ];

  // Add/Edit Modal
  showModal: boolean = false;
  editMode: boolean = false;
  categoryModel: CategoryModel = { id: 0, name: '', status: 'active' };

  // Delete Modal
  showConfirmModal: boolean = false;
  categoryToDeleteId: number | null = null;

  // Toast Notification
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  // Search & Filter
  searchTerm: string = '';
  filterStatus: string = '';
  pageSize: number = 3;
  currentPage: number = 1;

  // ---------- Add/Edit ----------
  openModal() {
    this.editMode = false;
    this.categoryModel = { id: 0, name: '', status: 'active' };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmSave() {
    if (!this.categoryModel.name.trim()) {
      this.showToastMessage('Category name cannot be empty!', 'error');
      return;
    }

    if (this.editMode) {
      const index = this.categories.findIndex(c => c.id === this.categoryModel.id);
      if (index !== -1) this.categories[index] = { ...this.categoryModel };
      this.showToastMessage('Category updated successfully!', 'success');
    } else {
      const newId = this.categories.length ? Math.max(...this.categories.map(c => c.id)) + 1 : 1;
      this.categories.push({ ...this.categoryModel, id: newId });
      this.showToastMessage('Category added successfully!', 'success');
    }

    this.closeModal();
  }

  editCategory(cat: CategoryModel) {
    this.editMode = true;
    this.categoryModel = { ...cat };
    this.showModal = true;
  }

  // ---------- Delete ----------
  deleteCategoryConfirm(id: number) {
    this.categoryToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.categoryToDeleteId !== null) {
      this.categories = this.categories.filter(c => c.id !== this.categoryToDeleteId);
      this.showToastMessage('Category deleted successfully!', 'success');
      this.categoryToDeleteId = null;
    }
    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.categoryToDeleteId = null;
    this.showConfirmModal = false;
  }

  // ---------- Toast ----------
  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    // Auto-hide after 2 seconds
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }

  // ---------- Filter ----------
  filteredCategories() {
    return this.categories.filter(cat =>
      cat.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterStatus ? cat.status === this.filterStatus : true)
    );
  }
}
