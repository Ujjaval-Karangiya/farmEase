import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  template: `
<section class="about-section position-relative py-5 overflow-hidden" id="home">
  
  <h1 class="bg-watermark animate-fade-in">AGRO</h1>

  <div class="container position-relative z-index-2">
    <div class="row align-items-center g-5">

      <div class="col-lg-4 text-lg-start text-center mb-4 mb-lg-0 animate__animated animate__fadeInLeft">
        <div class="d-inline-block px-3 py-1 rounded-pill bg-success bg-opacity-10 text-success fw-bold small mb-3 ls-2">
          EST. 2026
        </div>
        <h2 class="display-2 fw-bold lh-1">
          <span class="text-success">farm</span><span class="text-warning">Ease</span>
        </h2>
        <p class="text-secondary fw-semibold mt-2 fs-5 ls-1">Smart Farming, Simplified.</p>

        <a routerLink="/About" class="btn btn-outline-success rounded-pill px-5 py-2 mt-4 fw-bold transition-all shadow-sm">
          More About Us
        </a>
      </div>

      <div class="col-lg-4 text-center mb-4 mb-lg-0 animate__animated animate__zoomIn">
        <div class="image-wrapper position-relative">
          <div class="image-frame-decoration border-success"></div>
          <div class="image-container overflow-hidden rounded-4  p-4">
            <img src="aboutus.png" class="img-fluid main-img floating-anim" alt="Agro Excellence">
          </div>
        </div>
      </div>

      <div class="col-lg-4 text-lg-start text-center animate__animated animate__fadeInRight">
        <div class="ps-lg-4 border-start-lg border-success border-4">
          <p class="text-muted fs-6 leading-relaxed">
            <span class="fw-bold text-dark">FarmEase</span> is your platform for modern agriculture, providing news,
            expert insights, and updates on trends, techniques, and sustainable
            practices to keep farmers and enthusiasts informed.
          </p>

          <p class="text-muted mt-4 fs-6 leading-relaxed">
            We offer a <span class="text-success fw-semibold">trusted marketplace</span> for buying and selling
            agricultural products and machinery, connecting farmers and suppliers
            efficiently to support the global farming community.
          </p>
          
          <div class="mt-4 d-flex justify-content-center justify-content-lg-start gap-3">
             <div class="text-center">
                <h4 class="fw-bold text-dark mb-0">100%</h4>
                <small class="text-success fw-bold small">Secure</small>
             </div>
             <div class="vr mx-2"></div>
             <div class="text-center">
                <h4 class="fw-bold text-dark mb-0">Direct</h4>
                <small class="text-success fw-bold small">Market</small>
             </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
  `,
  styles: [`
.about-section {
  background-color: #fdfdfb;
}

/* Background Watermark */
.bg-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25vw;
  font-weight: 900;
  color: rgba(46, 125, 50, 0.03); /* Extremely subtle green */
  z-index: 1;
  pointer-events: none;
  letter-spacing: -10px;
}

.ls-1 { letter-spacing: 1px; }
.ls-2 { letter-spacing: 2px; }
.z-index-2 { z-index: 2; }

/* Image Frame Decoration */
.image-wrapper {
  padding: 15px;
}

.image-frame-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #2e7d32;
  border-radius: 25px;
  transform: rotate(-3deg);
  z-index: -1;
}

.main-img {
  transition: transform 0.5s ease;
}

.floating-anim {
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
}

/* Responsive Border */
@media (min-width: 992px) {
  .border-start-lg {
    border-left: 4px solid #2e7d32 !important;
  }
}

.leading-relaxed {
  line-height: 1.8;
}
  `]
})
export class AboutUsComponent { }
