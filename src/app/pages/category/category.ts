import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class Category{

  category = {
    name: '',
    description: '',
    status: true
  };

  categories = [
    { id: 1, name: 'Electronics', description: 'Electronic items', status: true },
    { id: 2, name: 'Clothing', description: 'Men & Women wear', status: true },
    { id: 3, name: 'Shoes', description: 'All types of shoes', status: false }
  ];

  addCategory() {
    if (!this.category.name) return;

    this.categories.push({
      id: this.categories.length + 1,
      name: this.category.name,
      description: this.category.description,
      status: this.category.status
    });

    this.category = {
      name: '',
      description: '',
      status: true
    };
  }

  deleteCategory(id: number) {
    this.categories = this.categories.filter(c => c.id !== id);
  }
}
