window.onload = function () {
    let consent = localStorage.getItem("cookie_consent");

    if (consent === "granted") {
        enableGA4(); // Load GA4 if already accepted
        loadClarity();
        hideCookieBanner();
    } else if (consent === "denied") {
        hideCookieBanner();
    } else {
        setTimeout(function () {
            showCookieBanner();
        }, 5000); // Show banner after 5 seconds
    }

   
};

// Helper functions for cookie banner animations
function showCookieBanner() {
    const banner = document.getElementById("consentx-banner");
    banner.style.display = "block";
    
    // Force reflow to ensure the display change takes effect
    banner.offsetHeight;
  
}

function hideCookieBanner() {
    const banner = document.getElementById("consentx-banner");
    
    
    
        banner.style.display = "none";
        // Match the CSS transition duration
}

// Accept Cookies and Enable GA4
function acceptConsentX() {
    localStorage.setItem("cookie_consent", "granted");

    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });

    gtag('config', 'G-Z44LLFS6JF'); // Now track page views
    loadClarity();

    hideCookieBanner();
    console.log("Cookies accepted, GA4 tracking enabled.");
}

// Deny Cookies and Disable Tracking
function denyConsentX() {
    localStorage.setItem("cookie_consent", "denied");

    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    hideCookieBanner();
    document.getElementById("manage-cookies").style.display = "block"; // Show manage button
    console.log("Cookies denied, GA4 tracking disabled.");
}

// Reopen Cookie Banner for Consent Management
function manageCookies() {
    showCookieBanner();
}
function loadClarity() {
    if (!window.clarity) { // Prevent multiple loads
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r); t.async=1; t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "utwyyh3a1v");
    }
}
// Enable GA4 if user has already accepted cookies
function enableGA4() {
    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });

    gtag('config', 'G-Z44LLFS6JF'); // Start tracking
    console.log("GA4 Consent Granted and Initialized");
}




// Initialize tabs functionality
function initializeTabs() {
    document.querySelectorAll('.tabs ul li').forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the parent section of the clicked tab
            const parentSection = tab.closest('.page-content');

            // Remove active class from all tabs in that section
            parentSection.querySelectorAll('.tabs ul li').forEach(item => item.classList.remove('active'));

            // Add active class to the clicked tab
            tab.classList.add('active');

            // Hide all tab content in that section
            parentSection.querySelectorAll('.tab-pane').forEach(content => content.classList.remove('active'));

            // Show the content corresponding to the clicked tab in that section
            const tabId = tab.id.replace('tab-', '');
            const targetContent = parentSection.querySelector('#content-' + tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Initialize FAQ functionality
function initializeFAQ() {
    document.querySelectorAll('.faq-item h4').forEach((question) => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
}

    

document.addEventListener("DOMContentLoaded", function () {
    const closeBtn = document.querySelector('.modern-close-btn');
    setTimeout(showMainPopup, 60000); // Show main popup after 30 seconds
    setTimeout(() => {
        if (closeBtn) {
            closeBtn.style.display = 'flex';
        }
      }, 70000);

    // Initialize FAQ functionality when DOM is loaded
    initializeFAQ();
    
    // Initialize tabs functionality
    initializeTabs();

});

function showMainPopup() {
    document.getElementById("supportPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("supportPopup").style.display = "none";
    showMiniPopup(); // Show mini popup when main popup is closed
}

function showMiniPopup() {
    document.getElementById("miniSupportPopup").style.display = "flex";
}

function redirectToSupport() {
    closePopup(); // Close the main popup
    window.location.href = '/#support'; // Redirect to support section
}



function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    
    // Toggle the active class on the hamburger button for animation
    toggleButton.classList.toggle('active');
    
    // Toggle the mobile menu visibility
    navMenu.classList.toggle('active');
}