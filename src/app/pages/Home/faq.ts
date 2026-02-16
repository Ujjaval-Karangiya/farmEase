import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  template: `
<section class="faq-section py-5 bg-light-subtle">
  <div class="container py-4">
    
    <div class="text-center mb-5 animate__animated animate__fadeIn">
      <span class="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2 mb-2 fw-bold text-uppercase ls-2">Support</span>
      <h2 class="fw-bold display-5 text-dark">Common Inquiries</h2>
      <p class="text-muted lead mx-auto" style="max-width: 600px;">Everything you need to know about the FarmEase ecosystem.</p>
      <div class="bg-success mx-auto rounded-pill mt-3" style="height: 4px; width: 60px;"></div>
    </div>

    <div class="faq-container mx-auto px-2" style="max-width: 850px;">
      
      <div *ngFor="let faq of faqs; let i = index" class="faq-item mb-3 animate__animated animate__fadeInUp">
        <input type="checkbox" [id]="'faq-' + i" class="faq-toggle d-none">
        
        <label [for]="'faq-' + i" class="faq-header d-flex align-items-center justify-content-between p-4 bg-white rounded-4 shadow-sm cursor-pointer transition-all">
          <span class="question-text fw-bold text-dark fs-5 pe-3">{{ faq.question }}</span>
          <div class="faq-icon-wrapper">
            <div class="icon-circle shadow-sm">
              <span class="line vertical"></span>
              <span class="line horizontal"></span>
            </div>
          </div>
        </label>

        <div class="faq-content overflow-hidden transition-all">
          <div class="content-inner p-4 pt-0 bg-white rounded-bottom-4 shadow-sm border-top border-light">
            <p class="text-secondary mb-0 leading-relaxed fs-6">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>

    </div>

    <div class="text-center mt-5 pt-4 animate-fade-in">
      <p class="text-muted mb-3">Still have questions?</p>
      <button class="btn btn-success rounded-pill px-5 py-2 fw-bold shadow-sm btn-hover-grow">
        <i class="fa-solid fa-headset me-2"></i>Contact Support Team
      </button>
    </div>

  </div>
</section>
  `,
  styles: [`
   .ls-2 { letter-spacing: 2px; }
.cursor-pointer { cursor: pointer; }

/* FAQ Item Logic */
.faq-toggle:checked ~ .faq-header {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: #f8fbf8 !important; /* Soft green tint on open */
}

.faq-toggle:checked ~ .faq-header .question-text {
  color: #2e7d32;
}

/* Icon Transformation */
.icon-circle {
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.line {
  position: absolute;
  background: #2e7d32;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.vertical { width: 2px; height: 14px; }
.horizontal { width: 14px; height: 2px; }

/* Rotate logic on check */
.faq-toggle:checked ~ .faq-header .vertical {
  transform: translate(-50%, -50%) rotate(90deg);
  opacity: 0;
}

.faq-toggle:checked ~ .faq-header .icon-circle {
  background: #2e7d32;
}

.faq-toggle:checked ~ .faq-header .horizontal {
  background: #fff;
}

/* Content Slide Animation */
.faq-content {
  max-height: 0;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0, 1, 0.5, 1);
}

.faq-toggle:checked ~ .faq-content {
  max-height: 500px;
  opacity: 1;
}

/* Transitions */
.transition-all {
  transition: all 0.3s ease;
}

.faq-header:hover {
  background-color: #fcfdfc;
  transform: translateY(-2px);
}

.leading-relaxed {
  line-height: 1.8;
}

.btn-hover-grow:hover {
  transform: scale(1.05);
}
  `]
})
export class FaqSectionComponent {
  faqs = [
    {
      question: 'What is FarmEase?',
      answer: 'FarmEase is a smart agriculture platform that helps farmers monitor crops, manage soil health, and optimize yield using AI-driven tools.'
    },
    {
      question: 'How does FarmEase improve crop production?',
      answer: 'We provide real-time insights via IoT sensors and satellite data, offering smart recommendations on irrigation and fertilization.'
    },
    {
      question: 'Can I buy and sell products on FarmEase?',
      answer: 'Yes! Our integrated Marketplace connects you directly with verified buyers and sellers for seeds, fertilizers, and machinery.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-grade encryption to ensure your farm data and transactions are private and protected.'
    },
    {
      question: 'How do I get started?',
      answer: 'Simply click the "Sign Up" button, create your farm profile, and start adding your fields to get instant soil health reports.'
    }
  ];
}
