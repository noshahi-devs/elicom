import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

type UserRole = 'admin' | 'customer' | '';

interface UserModel {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users {
  users: UserModel[] = [
    {
      id: 1,
      name: 'Adeel Noshahi',
      firstName: 'Adeel',
      lastName: 'Noshahi',
      email: 'adeel@example.com',
      phone: '0300-0000000',
      role: 'admin',
      isActive: true
    },
    {
      id: 2,
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '0300-1111111',
      role: 'customer',
      isActive: true
    }
  ];

  showModal = false;
  editMode = false;
  userModel: UserModel = this.getEmptyUser();

  showConfirmModal = false;
  userToDeleteId: number | null = null;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  searchTerm = '';
  filterRole: UserRole | '' = '';
  filterActive: '' | 'active' | 'inactive' = '';
  pageSize = 5;
  currentPage = 1;

  getEmptyUser(): UserModel {
    return {
      id: 0,
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'customer',
      isActive: true
    };
  }

  openModal() {
    this.editMode = false;
    this.userModel = this.getEmptyUser();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editUser(user: UserModel) {
    this.editMode = true;
    this.userModel = { ...user };
    this.showModal = true;
  }

  saveUser() {
    if (!this.userModel.name.trim()) {
      this.showToastMessage('Name is required!', 'error');
      return;
    }

    if (!this.userModel.email.trim()) {
      this.showToastMessage('Email is required!', 'error');
      return;
    }

    if (!this.userModel.role) {
      this.showToastMessage('Role is required!', 'error');
      return;
    }

    if (!this.userModel.firstName.trim()) {
      this.userModel.firstName = this.userModel.name.trim().split(' ')[0] ?? '';
    }

    if (!this.userModel.lastName.trim()) {
      const parts = this.userModel.name.trim().split(' ');
      this.userModel.lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
    }

    if (this.editMode) {
      const index = this.users.findIndex(u => u.id === this.userModel.id);
      if (index !== -1) this.users[index] = { ...this.userModel };
      this.showToastMessage('User updated successfully!', 'success');
    } else {
      const newId = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
      this.users.push({ ...this.userModel, id: newId });
      this.showToastMessage('User added successfully!', 'success');
    }

    this.closeModal();
  }

  deleteUserConfirm(id: number) {
    this.userToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.userToDeleteId !== null) {
      this.users = this.users.filter(u => u.id !== this.userToDeleteId);
      this.showToastMessage('User deleted successfully!', 'success');
      this.userToDeleteId = null;
    }
    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.userToDeleteId = null;
    this.showConfirmModal = false;
  }

  filteredUsers() {
    const term = this.searchTerm.trim().toLowerCase();

    return this.users.filter(u => {
      const matchesText =
        !term ||
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.phone.toLowerCase().includes(term);

      const matchesRole = this.filterRole ? u.role === this.filterRole : true;
      const matchesActive =
        this.filterActive === ''
          ? true
          : this.filterActive === 'active'
            ? u.isActive
            : !u.isActive;

      return matchesText && matchesRole && matchesActive;
    });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }
}
