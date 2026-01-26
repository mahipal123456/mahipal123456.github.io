class ConsentBox extends HTMLElement {
  connectedCallback() {
   

    // Otherwise show consent box
    this.innerHTML = `
      <div id="consentx-banner" class="modern-consentx-banner">
  <div class="consentx-banner-wrapper">
    <div class="consentx-content-section">
      <div class="consentx-icon-wrapper">
        <svg class="consentx-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
        </svg>
      </div>

      <div class="consentx-text-content">
        <p class="consentx-message">
          We use <strong>tools</strong> to enhance your browsing experience, analyze site traffic, and serve personalized content.
          By clicking 'Accept', you agree to these settings.
        </p>
      </div>
    </div>

    <div id="consentx-buttons" class="consentx-actions">
      <button class="consentx-btn acceptx-btn" onclick="acceptConsentX()">Accept All</button>
      <button class="consentx-btn denyx-btn" onclick="denyConsentX()">Deny</button>
    </div>
  </div>
</div>
    `;

    
    
  }
}

customElements.define("consent-box", ConsentBox);
