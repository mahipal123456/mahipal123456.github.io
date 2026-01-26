class SupportUs extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="supportPopup" class="modern-popup-overlay">
  <div class="modern-popup-container">
    <button id ="supportPopup" class="modern-close-btn" onclick="closePopup()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    
    <div class="popup-icon-container">
      <div class="popup-gift-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20,12 20,19 4,19 4,12"/>
          <rect x="2" y="7" width="20" height="5"/>
          <line x1="12" y1="22" x2="12" y2="2"/>
          <path d="M12 2a3 3 0 0 0-3 3v2h6V5a3 3 0 0 0-3-3z"/>
        </svg>
      </div>
    </div>
    
    <h2 class="popup-title">Love This Site? Support Us!</h2>
    <p class="popup-description">
      We give you premium features for free. Your support helps us keep working and making things better for you and everyone else.
    </p>
    
    <button class="popup-cta-button" onclick="redirectToSupport()">
      <span>Support Now</span>
      <svg class="button-gift" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="8" width="18" height="4"/>
        <rect x="3" y="12" width="18" height="9"/>
        <line x1="12" y1="2" x2="12" y2="22"/>
        <path d="M9 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3"/>
      </svg>
    </button>
    
    <div id="progressBar" class="modern-progress-bar"></div>
  </div>
</div>

<!-- Mini Popup (Bottom Right) -->
<div id="miniSupportPopup" class="modern-mini-popup" onclick="redirectToSupport()" style="display: none;">
  <div class="mini-popup-content">
    <div class="mini-popup-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
      </svg>
    </div>
    <span class="mini-popup-text">Enjoying this site? Support us!</span>
  </div>
</div>

    `;
  }
}

customElements.define("support-us", SupportUs);
