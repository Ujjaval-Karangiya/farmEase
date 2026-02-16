import { Component, Injectable, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  // Signal storing the wishlist items
  private itemsSignal = signal<WishlistItem[]>([
    {
      id: 1,
      name: 'Minimalist Watch',
      price: 129,
      imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.QpCAnafzxqdp47Q7lAfGNAHaE7?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
      inStock: true
    },
    {
      id: 2,
      name: 'Leather Backpack',
      price: 85,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.Jg6Crn-1KfEkKBr6ph8IkQHaE7?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
      inStock: false
    }
  ]);

  // Readonly access to wishlist items
  public items = this.itemsSignal.asReadonly();

  // Computed total value of wishlist
  public total = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.price, 0)
  );

  // Remove an item by id
  remove(id: number) {
    this.itemsSignal.update(items => items.filter(item => item.id !== id));
  }
}

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styles: [`
    .img-thumbnail-fixed {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }

    /* Optional: subtle hover animation */
    .card:hover {
      transform: scale(1.02);
      transition: transform 0.2s ease-in-out;
      box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.15);
    }
  `]
})
export class WishlistComponent {
  private service = inject(WishlistService);

  // Expose the wishlist and total value to the template
  wishlistItems = this.service.items;
  totalValue = this.service.total;

  // Remove item from wishlist
  removeItem(id: number) {
    this.service.remove(id);
  }

  // TrackBy function for ngFor
  trackById(index: number, item: WishlistItem) {
    return item.id;
  }
}
