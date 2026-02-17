import { Component, OnInit } from '@angular/core';
import { Card } from '../../Components/card/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  isLoading: boolean = true;
  products: any[] = [];

  // 1. Centralized Source of Truth
  private readonly SOURCES = [
    { key: 'all_agri_items', type: 'Agri' },
    { key: 'all_agri_inventories', type: 'Machinery' }
  ];

  ngOnInit(): void {
    this.refreshProducts();
  }

  refreshProducts(): void {
    this.isLoading = true;
    this.products = []; // Clear current list to force UI refresh

    try {
      const allItems: any[] = [];

      // 2. Extract and Combine
      this.SOURCES.forEach(source => {
        const data = localStorage.getItem(source.key);
        if (data) {
          const parsed = JSON.parse(data);
          // Add a 'sourceType' to help the UI differentiate if needed
          const typedData = parsed.map((item: any) => ({ ...item, sourceType: source.type }));
          allItems.push(...typedData);
        }
      });

      // 3. Transform to Card Interface
      this.products = allItems.map(item => this.mapToCard(item));

      console.log('Successfully fetched products:', this.products.length);

    } catch (err) {
      console.error('Failed to fetch from LocalStorage:', err);
    } finally {
      // Small delay to ensure Angular's change detection catches the update
      setTimeout(() => (this.isLoading = false), 300);
    }
  }

  // 4. Dedicated Mapper (Handles Different Interfaces)
  private mapToCard(item: any) {
    return {
      title: item.name || 'Untitled Product',
      subtitle: item.sourceType === 'Machinery' ? `Machinery (${item.condition})` : item.category,
      description: item.description || `High-quality ${item.name} available now.`,
      imageUrl: item.image || 'assets/products/placeholder.jpg',
      label: item.quantity > 0 ? 'In Stock' : 'Out of Stock',
      metaText: `₹${item.price}`,
      buttonText: 'View Details',
      link: `/products/${item.id}`,
      action: () => this.viewProduct(item.name)
    };
  }

  viewProduct(name: string) {
    console.log('Navigating to:', name);
    alert('Viewing details for: ' + name);
  }
}
