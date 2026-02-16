
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
.ls-2 { letter-spacing: 2px; }
.leading-relaxed { line-height: 1.8; }

.services-section {
  background-color: #e6ffe8;
}

/* Service Card Styling */
.service-card {
  position: relative;
  cursor: pointer;
  z-index: 1;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background: #f8fbf8;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.service-card:hover {
  transform: translateY(-12px);
  background: #ffffff;
  box-shadow: 0 1.5rem 4rem rgba(46, 125, 50, 0.1) !important;
}

.service-card:hover .icon-wrapper {
  background: #2e7d32;
  color: #ffffff !important;
  transform: rotateY(180deg);
  box-shadow: 0 10px 20px rgba(46, 125, 50, 0.3);
}

.service-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(5px);
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

.transition-all {
  transition: all 0.3s ease-in-out;
}
`,
  ],
  template: ` 
<section class="services-section py-5 position-relative overflow-hidden">
  <div class="container py-4">

    <div class="row align-items-end mb-5 animate__animated animate__fadeIn">
      <div class="col-lg-6">
        <span class="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2 mb-3 fw-bold text-uppercase ls-2">
          What We Offer
        </span>
        <h2 class="display-5 fw-bold text-dark lh-sm">
          Empowering Modern Agriculture <br>
          <span class="text-success">Innovation & Marketplace</span>
        </h2>
      </div>

      <div class="col-lg-5 offset-lg-1 mt-4 mt-lg-0">
        <p class="text-muted fs-6 leading-relaxed mb-4">
          FarmEase brings together the latest agricultural news, expert insights,
          sustainable farming techniques, and a trusted marketplace to strengthen 
          modern agriculture for everyone.
        </p>
        <a routerLink="/Products" class="btn btn-outline-success rounded-pill px-4 py-2 fw-bold transition-all">
          Explore All Services <i class="fa-solid fa-arrow-right-long ms-2"></i>
        </a>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-3 col-md-6 animate-slide-up" 
           *ngFor="let service of services; let i = index"
           [style.animation-delay]="i * 0.1 + 's'">

        <div class="service-card h-100 p-4 rounded-4 border-0 shadow-sm transition-all bg-white">
          <div class="icon-wrapper mb-4 d-flex align-items-center justify-content-center rounded-4 shadow-sm text-success">
            <i [class]="'fa-solid fs-3 ' + service.icon"></i>
          </div>

          <h5 class="fw-bold text-dark mb-3">{{ service.title }}</h5>
          <p class="text-muted small mb-0 leading-normal">
            {{ service.desc }}
          </p>
          
          <div class="card-arrow mt-4 text-success opacity-0 transition-all">
            <i class="fa-solid fa-circle-arrow-right fs-4"></i>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>
`,
})
export class Services {
  services = [
    {
      icon: 'bi-newspaper',
      title: 'Agri News & Trends',
      desc: 'Stay updated with the latest agricultural news, market trends, and policy changes affecting modern farming.'
    },

    {
      icon: 'bi-shop',
      title: 'Agri Marketplace',
      desc: 'Buy and sell crops, seeds, fertilizers, and machinery through our trusted and farmer-friendly marketplace.'
    },
    {
      icon: 'bi-gear',
      title: 'Machinery Exchange',
      desc: 'Connect with verified suppliers to purchase or sell tractors, tools, and modern agricultural equipment.'
    },
    {
      icon: 'bi-people',
      title: 'Farmer Community',
      desc: 'Join a growing network of farmers and agri-enthusiasts to share knowledge, experiences, and opportunities.'
    }
  ];

}
