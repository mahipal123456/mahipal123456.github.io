class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer id="footer" class="modern-footer">
    <div class="footer-container">
      <div class="footer-inner">
        <div class="footer-content">
        <div class="footer-brand-section">
          <h3 class="footer-brand">Text to Handwriting</h3>
          <p class="footer-description">Transform your text into beautiful, realistic handwriting with our free, premium-quality tool.</p>
          
          <div class="footer-social-links">
            <a href="mailto:mahipalkumawat810@gmail.com" target="_blank" class="social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4,4h16c1.1,0,2,.9,2,2v12c0,1.1-.9,2-2,2H4c-1.1,0-2-.9-2-2V6c0-1.1.9-2,2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
            <a href="https://chat.whatsapp.com/HaMKaldMXf7IpZiy7EqUFi"
   target="_blank"
   class="social-link"
   aria-label="WhatsApp Group"
   rel="noopener noreferrer">

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    role="img"
    aria-hidden="true"
    fill="currentColor">
    
    <path d="M16.01 2.005C8.28 2.005 2.005 8.28 2.005 16c0 2.82.83 5.45 2.26 7.67L2 30l6.55-2.15A13.9 13.9 0 0 0 16 29.995c7.72 0 14-6.27 14-13.995S23.73 2.005 16.01 2.005Zm0 25.49c-2.38 0-4.6-.69-6.48-1.87l-.46-.29-3.88 1.27 1.29-3.77-.3-.49a11.44 11.44 0 1 1 9.83 5.14Zm6.57-8.53c-.36-.18-2.13-1.05-2.46-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.78-1.07-.95-1.8-2.13-2.01-2.49-.21-.36-.02-.56.16-.74.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.69-.59-.6-.81-.61h-.69c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.53 3.87 6.13 5.43.86.37 1.53.59 2.05.75.86.27 1.65.23 2.27.14.69-.1 2.13-.87 2.43-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42Z"/>
  </svg>
</a>

            <a href="https://www.linkedin.com/in/mahipalkumawat810" target="_blank" class="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-links-section">
          <h4 class="footer-section-title">Legal</h4>
          <div class="footer-links-grid">
            <a href="/#privacy-policy" class="footer-link">Privacy Policy</a>
            <a href="/#copyright-policy" class="footer-link">Copyright Policy</a>
            <a href="/#terms_conditions" class="footer-link">Terms & Conditions</a>
            <a href="#" id="manage-cookies" class="footer-link" " onclick="manageCookies()">Manage Cookies</a>
          </div>
        </div>

        <div class="footer-info-section">
          <h4 class="footer-section-title">License</h4>
          <div class="license-info">
            <div class="license-badge">
              <svg class="license-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Proprietary License</span>
            </div>
            <p class="license-text">All rights reserved under proprietary licensing terms.</p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-divider"></div>
        <div class="footer-bottom-content">
          <div class="footer-left-content">
            <p class="footer-copyright">© 2024 Text to Handwriting. All rights reserved.</p>
            <p class="footer-credit">Made with care by <a href="https://www.linkedin.com/in/mahipalkumawat810" target="_blank" class="creator-link">Mahipal Kumawat</a></p>
          </div>
        </div>
        </div>
      </div>
    </div>
  </footer>
    `;
  }
}

customElements.define("my-footer", MyFooter);
