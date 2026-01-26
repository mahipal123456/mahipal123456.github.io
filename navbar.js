class MyNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar">
        <div class="nav-container">
          <!-- Logo/Brand -->
          <div class="nav-brand">
            <a href="/" class="brand-link">
              <span class="brand-icon">T2H</span>
              <span class="brand-text">Text to Handwriting</span>
            </a>
          </div>

          <!-- Navigation Links -->
          <ul class="nav-menu">
            <li class="nav-item">
              <a href="/" class="nav-link" id="nav-home">
                <span class="nav-text">Home</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/Blog/" class="nav-link" id="nav-blog">
                <span class="nav-text">How to Use</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/#Contact" class="nav-link" id="nav-contact">
                <span class="nav-text">Contact</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/#about" class="nav-link" id="nav-contact">
                <span class="nav-text">About</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/#support" class="nav-link support-btn">
                <span class="nav-text">Support Us</span>
              </a>
            </li>
          </ul>

          <!-- Mobile Menu Toggle -->
          <div class="mobile-menu-toggle" onclick="toggleMobileMenu()">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("my-navbar", MyNavbar);
