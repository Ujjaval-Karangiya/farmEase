import { Component } from '@angular/core';
import { Card } from '../../Components/card/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Card],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: any[] = [

    {
      title: 'Organic Wheat Seeds',
      subtitle: 'High Yield Variety',
      description: 'Premium quality organic wheat seeds suitable for all soil types. High germination rate and disease resistant.',
      imageUrl: 'assets/products/wheat-seeds.jpg',
      label: 'Best Seller',
      metaText: '₹450 / 10kg',
      date: 'Available Now',
      buttonText: 'View Details',
      link: '/products/wheat-seeds',
      action: () => this.viewProduct('Organic Wheat Seeds')
    },

    {
      title: 'Bio Fertilizer',
      subtitle: 'Eco Friendly',
      description: 'Improves soil fertility naturally and increases crop productivity without harmful chemicals.',
      imageUrl: 'assets/products/bio-fertilizer.jpg',
      label: 'Organic',
      metaText: '₹299 / bag',
      date: 'In Stock',
      buttonText: 'View Details',
      link: '/products/bio-fertilizer',
      action: () => this.viewProduct('Bio Fertilizer')
    },

    {
      title: 'Drip Irrigation Kit',
      subtitle: 'Water Saving Solution',
      description: 'Complete drip irrigation kit ideal for farms. Saves water and improves crop growth efficiency.',
      imageUrl: 'assets/products/drip-kit.jpg',
      label: 'New',
      metaText: '₹2,999',
      date: 'Limited Stock',
      buttonText: 'View Details',
      link: '/products/drip-kit',
      action: () => this.viewProduct('Drip Irrigation Kit')
    },

    {
      title: 'Organic Pesticide',
      subtitle: 'Safe Crop Protection',
      description: 'Natural pesticide that protects crops from insects without harming soil or environment.',
      imageUrl: 'assets/products/pesticide.jpg',
      label: 'Eco Safe',
      metaText: '₹199',
      date: 'Available',
      buttonText: 'View Details',
      link: '/products/pesticide',
      action: () => this.viewProduct('Organic Pesticide')
    },

    {
      title: 'Tractor Sprayer',
      subtitle: 'Heavy Duty Equipment',
      description: 'Efficient tractor-mounted sprayer for fast and uniform spraying across large farms.',
      imageUrl: 'assets/products/sprayer.jpg',
      label: 'Popular',
      metaText: '₹8,500',
      date: 'In Stock',
      buttonText: 'View Details',
      link: '/products/sprayer',
      action: () => this.viewProduct('Tractor Sprayer')
    }

  ];

  viewProduct(productName: string): void {
    console.log('Viewing product:', productName);
    alert('Viewing: ' + productName);
  }

  handleImageError(event: any): void {
    event.target.src = 'logo.png';
  }
}
