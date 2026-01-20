import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

type AddressType = 'shipping' | 'billing' | '';

interface UserAddressModel {
  id: number;
  userId: number;
  addressType: AddressType;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
  deliveryInstructions: string;
}

@Component({
  selector: 'app-user-addresses',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './user-addresses.html',
  styleUrls: ['./user-addresses.css']
})
export class UserAddresses {
  addresses: UserAddressModel[] = [
    {
      id: 1,
      userId: 1,
      addressType: 'shipping',
      firstName: 'Adeel',
      lastName: 'Noshahi',
      addressLine1: 'Street 1',
      addressLine2: '',
      city: 'Lahore',
      state: 'Punjab',
      postalCode: '54000',
      country: 'PK',
      phone: '0300-0000000',
      isDefault: true,
      deliveryInstructions: ''
    }
  ];

  showModal = false;
  editMode = false;
  addressModel: UserAddressModel = this.getEmptyAddress();

  showConfirmModal = false;
  addressToDeleteId: number | null = null;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  searchTerm = '';
  filterType: AddressType | '' = '';
  pageSize = 8;
  currentPage = 1;

  getEmptyAddress(): UserAddressModel {
    return {
      id: 0,
      userId: 0,
      addressType: 'shipping',
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
      isDefault: false,
      deliveryInstructions: ''
    };
  }

  openModal() {
    this.editMode = false;
    this.addressModel = this.getEmptyAddress();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editAddress(addr: UserAddressModel) {
    this.editMode = true;
    this.addressModel = { ...addr };
    this.showModal = true;
  }

  saveAddress() {
    if (!this.addressModel.userId || this.addressModel.userId <= 0) {
      this.showToastMessage('User ID is required!', 'error');
      return;
    }

    if (!this.addressModel.addressType) {
      this.showToastMessage('Address type is required!', 'error');
      return;
    }

    if (!this.addressModel.addressLine1.trim()) {
      this.showToastMessage('Address line 1 is required!', 'error');
      return;
    }

    if (!this.addressModel.city.trim()) {
      this.showToastMessage('City is required!', 'error');
      return;
    }

    if (!this.addressModel.postalCode.trim()) {
      this.showToastMessage('Postal code is required!', 'error');
      return;
    }

    if (this.addressModel.isDefault) {
      this.addresses = this.addresses.map(a => ({ ...a, isDefault: false }));
    }

    if (this.editMode) {
      const index = this.addresses.findIndex(a => a.id === this.addressModel.id);
      if (index !== -1) this.addresses[index] = { ...this.addressModel };
      this.showToastMessage('Address updated successfully!', 'success');
    } else {
      const newId = this.addresses.length ? Math.max(...this.addresses.map(a => a.id)) + 1 : 1;
      this.addresses.push({ ...this.addressModel, id: newId });
      this.showToastMessage('Address added successfully!', 'success');
    }

    this.closeModal();
  }

  deleteAddressConfirm(id: number) {
    this.addressToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.addressToDeleteId !== null) {
      this.addresses = this.addresses.filter(a => a.id !== this.addressToDeleteId);
      this.showToastMessage('Address deleted successfully!', 'success');
      this.addressToDeleteId = null;
    }

    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.addressToDeleteId = null;
    this.showConfirmModal = false;
  }

  filteredAddresses() {
    const term = this.searchTerm.trim().toLowerCase();

    return this.addresses.filter(a => {
      const matchesText =
        !term ||
        `${a.id}`.includes(term) ||
        `${a.userId}`.includes(term) ||
        a.city.toLowerCase().includes(term) ||
        a.addressLine1.toLowerCase().includes(term);

      const matchesType = this.filterType ? a.addressType === this.filterType : true;

      return matchesText && matchesType;
    });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }
}
