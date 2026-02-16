import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: any[] = [
    { id: 1, name: 'Organic Urea Fertilizer', price: 850, quantity: 1, img: 'https://cdn-icons-png.flaticon.com/512/3043/3043810.png' },
    { id: 2, name: 'Hybrid Tomato Seeds', price: 450, quantity: 2, img: 'https://cdn-icons-png.flaticon.com/512/811/811346.png' }
  ];

  get subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  updateQuantity(index: number, change: number) {
    const newQty = this.cartItems[index].quantity + change;
    if (newQty > 0) {
      this.cartItems[index].quantity = newQty;
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  ngOnInit(): void { }
}
