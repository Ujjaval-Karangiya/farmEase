import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AgriItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  image?: string;
  postedBy: string; // Tracks the owner
}

@Component({
  selector: 'app-item-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class Modal implements OnInit {
  currentUser: string = '';
  items: AgriItem[] = [];
  isEditing: boolean = false;
  editingId: number | null = null;

  newItem:any = { name: '', category: '', quantity: 1, price: 0, description: '', image: '' };

  private readonly STORAGE_KEY = 'all_agri_inventories';

  ngOnInit(): void {
    const userString = localStorage.getItem('CurrentUser');
    if (userString) {
      this.currentUser = JSON.parse(userString).email || 'Guest';
    }
    this.loadInventory();
  }

  loadInventory(): void {
    const allData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    this.items = allData[this.currentUser] || [];
  }

  handleSave(): void {
    if (!this.newItem.name || this.newItem.price <= 0) return alert('Fill required fields');

    const allData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
    if (!allData[this.currentUser]) allData[this.currentUser] = [];

    if (this.isEditing && this.editingId) {
      allData[this.currentUser] = allData[this.currentUser].map((item: AgriItem) =>
        item.id === this.editingId ? { ...this.newItem, id: this.editingId, postedBy: this.currentUser } : item
      );
    } else {
      const itemToSave = { ...this.newItem, id: Date.now(), postedBy: this.currentUser };
      allData[this.currentUser].push(itemToSave);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allData));
    this.resetForm();
    this.loadInventory();
  }

  deleteItem(id: number): void {
    if (confirm('Remove this item?')) {
      const allData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
      allData[this.currentUser] = allData[this.currentUser].filter((i: AgriItem) => i.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allData));
      this.loadInventory();
    }
  }

  editItem(item: AgriItem): void {
    this.isEditing = true;
    this.editingId = item.id;
    this.newItem = { ...item };
  }

  resetForm() {
    this.newItem = { name: '', category: '', quantity: 1, price: 0, description: '', image: '' };
    this.isEditing = false;
    this.editingId = null;
  }

  getTotalValue(): number {
    return this.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }
}
