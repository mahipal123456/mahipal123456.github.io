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
        parentSection.querySelector('#content-' + tabId).classList.add('active');
    });
});


    document.querySelectorAll('.faq-item h4').forEach((question) => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    if (navbar.style.display === 'flex') {
        navbar.style.display = 'none';
    } else {
        navbar.style.display = 'flex';
    }
}
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(showMainPopup, 30000); // Show main popup after 30 seconds
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
    window.location.href = '../#support'; // Redirect to support section
}
// STEP 1: Show cookie banner after 5 seconds if no consent is given
window.onload = function () {
    let consent = localStorage.getItem("cookie_consent");

    if (consent === "granted") {
        loadClarity(); // Load Clarity if already accepted
        enableGA4();   // Ensure GA4 is loaded
        document.getElementById("cookie-banner").style.display = "none";
    } else if (consent === "denied") {
        document.getElementById("cookie-banner").style.display = "none";
    } else {
        setTimeout(function () {
            document.getElementById("cookie-banner").style.display = "flex";
        }, 5000); // Show after 5 seconds
    }

    // Show "Manage Cookies" button if consent was already given
    if (consent) {
        document.getElementById("manage-cookies").style.display = "block";
    }
};

// STEP 2: Function to accept cookies and update consent mode
function acceptCookies() {
    localStorage.setItem("cookie_consent", "granted");

    // Enable Google Consent Mode & Load GA4
    enableGA4();

    // Load Microsoft Clarity
    loadClarity();

    document.getElementById("cookie-banner").style.display = "none";
    document.getElementById("manage-cookies").style.display = "block"; // Show manage button
}

// STEP 3: Function to deny cookies (keeps default "denied" state)
function denyCookies() {
    localStorage.setItem("cookie_consent", "denied");

    // Disable Google Consent Mode
    if (typeof gtag === "function") {
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        });
    }

    document.getElementById("cookie-banner").style.display = "none";
    document.getElementById("manage-cookies").style.display = "block"; // Show manage button
}

// STEP 4: Function to load Microsoft Clarity (only if not loaded)
function loadClarity() {
    if (!window.clarity) { // Prevent multiple loads
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r); t.async=1; t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "ork3584d36");
    }
}

// STEP 5: Function to open cookie banner for consent management
function manageCookies() {
    document.getElementById("cookie-banner").style.display = "flex";
}

// STEP 6: Function to enable Google Analytics 4 (GA4)
function enableGA4() {
    if (typeof gtag === "function") {
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        });
        console.log("GA4 Consent Granted and Initialized");
    } else {
        console.warn("GA4 (gtag) not initialized yet. Make sure your GA4 script is added.");
    }
}