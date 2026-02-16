import { Component, OnInit } from '@angular/core'; // Added OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AgriItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

interface AllInventories {
  [username: string]: AgriItem[];
}

@Component({
  selector: 'app-item-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.css']
})
export class ItemManagerComponent implements OnInit {
  currentUser: string = '';
  items: AgriItem[] = [];
  
  newItem: Omit<AgriItem, 'id'> = { 
    name: '', 
    category: '', 
    quantity: 0, 
    price: 0, 
    description: '' 
  };
  
  private readonly CENTRAL_STORAGE_KEY = 'all_agri_inventories';

  ngOnInit(): void {
    this.loadUserFromStorage();
    this.onUserChange(); // Automatically load items for the found user
  }

  private loadUserFromStorage(): void {
    const userString = localStorage.getItem('CurrentUser');
    if (userString) {
      try {
        const userObject = JSON.parse(userString);
        this.currentUser = userObject.email || '';
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }

  // Helper to load the entire central object
  private getAllData(): AllInventories {
    const data = localStorage.getItem(this.CENTRAL_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  // Helper to save the entire central object
  private saveAllData(data: AllInventories): void {
    localStorage.setItem(this.CENTRAL_STORAGE_KEY, JSON.stringify(data));
  }

  onUserChange(): void {
    const user = this.currentUser?.trim();
    if (user) {
      const allData = this.getAllData();
      this.items = allData[user] || [];
    } else {
      this.items = [];
    }
  }

  addItem(): void {
    const user = this.currentUser?.trim();
    if (!user) {
      alert('No valid user found. Please log in.');
      return;
    }

    if (this.newItem.name.trim() && this.newItem.quantity > 0) {
      const itemToSave: AgriItem = {
        id: Date.now(),
        ...this.newItem
      };

      const allData = this.getAllData();
      
      if (!allData[user]) {
        allData[user] = [];
      }

      allData[user].push(itemToSave);
      this.saveAllData(allData);
      
      // Update local view and reset form
      this.items = [...allData[user]]; 
      this.newItem = { name: '', category: '', quantity: 0, price: 0, description: '' };
    } else {
      alert('Please fill in Item Name and Quantity!');
    }
  }

  deleteItem(id: number): void {
    const user = this.currentUser?.trim();
    if (!user) return;

    const allData = this.getAllData();
    if (allData[user]) {
      allData[user] = allData[user].filter(item => item.id !== id);
      this.saveAllData(allData);
      this.items = [...allData[user]];
    }
  }

  getTotalValue(): number {
    return this.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }
}