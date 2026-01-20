import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

interface SettingModel {
  id: number;
  key: string;
  value: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings {
  settings: SettingModel[] = [
    { id: 1, key: 'checkout_pickup_shipping', value: '0' },
    { id: 2, key: 'checkout_nearest_warehouse_shipping', value: '1' }
  ];

  showModal = false;
  editMode = false;
  settingModel: SettingModel = this.getEmptySetting();

  showConfirmModal = false;
  settingToDeleteId: number | null = null;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  searchTerm = '';
  pageSize = 8;
  currentPage = 1;

  getEmptySetting(): SettingModel {
    return { id: 0, key: '', value: '' };
  }

  openModal() {
    this.editMode = false;
    this.settingModel = this.getEmptySetting();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editSetting(setting: SettingModel) {
    this.editMode = true;
    this.settingModel = { ...setting };
    this.showModal = true;
  }

  saveSetting() {
    if (!this.settingModel.key.trim()) {
      this.showToastMessage('Key is required!', 'error');
      return;
    }

    if (!this.settingModel.value.trim()) {
      this.showToastMessage('Value is required!', 'error');
      return;
    }

    if (this.editMode) {
      const index = this.settings.findIndex(s => s.id === this.settingModel.id);
      if (index !== -1) this.settings[index] = { ...this.settingModel };
      this.showToastMessage('Setting updated successfully!', 'success');
    } else {
      const newId = this.settings.length ? Math.max(...this.settings.map(s => s.id)) + 1 : 1;
      this.settings.push({ ...this.settingModel, id: newId });
      this.showToastMessage('Setting added successfully!', 'success');
    }

    this.closeModal();
  }

  deleteSettingConfirm(id: number) {
    this.settingToDeleteId = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (this.settingToDeleteId !== null) {
      this.settings = this.settings.filter(s => s.id !== this.settingToDeleteId);
      this.showToastMessage('Setting deleted successfully!', 'success');
      this.settingToDeleteId = null;
    }

    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.settingToDeleteId = null;
    this.showConfirmModal = false;
  }

  filteredSettings() {
    const term = this.searchTerm.trim().toLowerCase();

    return this.settings.filter(s => {
      if (!term) return true;
      return s.key.toLowerCase().includes(term) || s.value.toLowerCase().includes(term);
    });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2000);
  }
}
