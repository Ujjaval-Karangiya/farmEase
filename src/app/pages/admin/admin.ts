import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "../../Auth/auth.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface Machinery {
  id: number;
  name: string;
  price: number;
  image: string;
  condition: string;
  quantity: number;
  category: string;
  description: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin implements OnInit {
  activePage: string = 'dashboard';
  sidebarOpen = false;

  private readonly MACHINERY_STORAGE_KEY = 'all_agri_items';
  private readonly USERS_STORAGE_KEY = 'Users';

  farmers: any[] = [];
  customers: any[] = [];
  machineries: any[] = [];

  // Track if we are editing an existing item
  isEditing = false;
  editingId: number | null = null;

  newMachinery = { name: '', price: 0, image: '', condition: '', quantity: 1, category: '', description: '' };
  currentAdminName: string = '';

  private router = inject(Router);
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.checkAdminAccess();
    this.refreshUserLists();
    this.loadMachinery();
  }
  checkAdminAccess(): void {
    const admin = JSON.parse(localStorage.getItem('CurrentUser') || '{}');
    this.currentAdminName = admin.fullName || 'Admin';
    if (admin.role !== 'admin') {
      this.router.navigate(['/Login']);
    }
  }

  // --- USER MANAGEMENT (DELETE/READ) ---

  refreshUserLists(): void {
    const allUsers = JSON.parse(localStorage.getItem(this.USERS_STORAGE_KEY) || '[]');
    this.farmers = allUsers.filter((u: any) => u.role === 'farmer').map((u: any) => this.formatUser(u));
    this.customers = allUsers.filter((u: any) => u.role === 'customer').map((u: any) => this.formatUser(u));
  }

  private formatUser(u: any) {
    return {
      ...u,
      avatar: u.avatar || `https://ui-avatars.com/api/?name=${u.fullName}&background=${u.role === 'farmer' ? '2e7d32' : '1e293b'}&color=fff`
    };
  }

  handleUserDelete(email: string): void {
    if (confirm('Are you sure you want to remove this user? This action cannot be undone.')) {
      const allUsers = JSON.parse(localStorage.getItem(this.USERS_STORAGE_KEY) || '[]');
      const filteredUsers = allUsers.filter((u: any) => u.email !== email);
      localStorage.setItem(this.USERS_STORAGE_KEY, JSON.stringify(filteredUsers));
      this.refreshUserLists();
    }
  }

  // --- MACHINERY MANAGEMENT (CREATE/UPDATE/DELETE) ---

  handleItemAddOrUpdate(): void {
    if (!this.newMachinery.name || this.newMachinery.price <= 0) {
      alert('Please fill in required fields');
      return;
    }

    if (this.isEditing && this.editingId) {
      // UPDATE logic
      this.machineries = this.machineries.map(m =>
        m.id === this.editingId ? { ...this.newMachinery, id: this.editingId } : m
      );
    } else {
      // CREATE logic
      const machineToSave = {
        ...this.newMachinery,
        id: Date.now(),
        image: this.newMachinery.image || 'https://via.placeholder.com/150'
      };
      this.machineries.push(machineToSave);
    }

    this.saveMachineryToStorage();
    this.resetForm();
  }

  editMachinery(item: any): void {
    this.isEditing = true;
    this.editingId = item.id;
    this.newMachinery = { ...item };
  }

  handleItemRemove(id: number): void {
    if (confirm('Delete this item from inventory?')) {
      this.machineries = this.machineries.filter(m => m.id !== id);
      this.saveMachineryToStorage();
    }
  }

  setPage(page: string): void {
    this.activePage = page;
    if (page === 'machinery') {
      this.resetForm();
    }
  }
  saveMachineryToStorage() {
    localStorage.setItem(this.MACHINERY_STORAGE_KEY, JSON.stringify(this.machineries));
  }

  loadMachinery(): void {
    const data = localStorage.getItem(this.MACHINERY_STORAGE_KEY);
    this.machineries = data ? JSON.parse(data) : [];
  }
  getTotalValue(): number {
    return this.machineries.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  }
  editItem(item: Machinery): void {
    this.isEditing = true;
    this.editingId = item.id;
    this.newMachinery = { ...item };
  }
  resetForm() {
    this.newMachinery = { name: '', price: 0, image: '', condition: '', quantity: 1, category: '', description: '' };
    this.isEditing = false;
    this.editingId = null;
  }

  // ... (loadAdminData, setPage, toggleSidebar remain the same)
}
