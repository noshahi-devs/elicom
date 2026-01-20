import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

interface WishlistModel {
  id: number;
  userId: number;
  productId: number;
}

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './wishlists.html',
  styleUrls: ['./wishlists.css']
})
export class Wishlists {
  wishlists: WishlistModel[] = [
    { id: 1, userId: 1, productId: 10 },
    { id: 2, userId: 2, productId: 11 }
  ];

  showModal = false;
  editMode = false;
  wishlistModel: WishlistModel = this.getEmptyWishlist();

  showConfirmModal = false;
  wishlistToDeleteId: number | null = null;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  searchTerm = '';
  pageSize = 8;
  currentPage = 1;

  getEmptyWishlist(): WishlistModel {
    return { id: 0, userId: 0, productId: 0 };
  }

  openModal() {
    this.editMode = false;
    this.wishlistModel = this.getEmptyWishlist();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editWishlist(w: WishlistModel) {
    this.editMode = true;
    this.wishlistModel = { ...w };
    this.showModal = true;
  }

  saveWishlist() {
    if (!this.wishlistModel.userId || this.wishlistModel.userId <= 0) {
      this.showToastMessage('User ID is required!', 'error');
      return;
    }

    if (!this.wishlistModel.productId || this.wishlistModel.productId <= 0) {
      this.showToastMessage('Product ID is required!', 'error');
      return;
    }

    if (this.editMode) {
      const index = this.wishlists.findIndex(x => x.id === this.wishlistModel.id);
      if (index !== -1) this.wishlists[index] = { ...this.wishlistModel };
      this.showToastMessage('Wishlist updated successfully!', 'success');
    } else {
      const newId = this.wishlists.length ? Math.max(...this.wishlists.map(x => x.id)) + 1 : 1;
      this.wishlists.push({ ...this.wishlistModel, id: newId });
      this.showToastMessage('Wishlist added successfully!', 'success');
    }

    this.closeModal();
  }

  deleteWishlistConfirm(id: number) {
    this.wishlistToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.wishlistToDeleteId !== null) {
      this.wishlists = this.wishlists.filter(w => w.id !== this.wishlistToDeleteId);
      this.showToastMessage('Wishlist deleted successfully!', 'success');
      this.wishlistToDeleteId = null;
    }

    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.wishlistToDeleteId = null;
    this.showConfirmModal = false;
  }

  filteredWishlists() {
    const term = this.searchTerm.trim().toLowerCase();

    return this.wishlists.filter(w => {
      if (!term) return true;
      return `${w.id}`.includes(term) || `${w.userId}`.includes(term) || `${w.productId}`.includes(term);
    });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }
}
