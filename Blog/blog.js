
window.onload = function () {
    let consent = localStorage.getItem("cookie_consent");

    if (consent === "granted") {
        enableGA4(); // Load GA4 if already accepted
        loadClarity();
        document.getElementById("cookie-banner").style.display = "none";
    } else if (consent === "denied") {
        document.getElementById("cookie-banner").style.display = "none";
    } else {
        setTimeout(function () {
            document.getElementById("cookie-banner").style.display = "flex";
        }, 5000); // Show banner after 5 seconds
    }

    // Show "Manage Cookies" button if consent is given
    if (consent) {
        document.getElementById("manage-cookies").style.display = "block";
    }
};

// Accept Cookies and Enable GA4
function acceptCookies() {
    localStorage.setItem("cookie_consent", "granted");

    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });

    gtag('config', 'G-9N9V3HXNYT'); // Now track page views
    loadClarity();

    document.getElementById("cookie-banner").style.display = "none";
    document.getElementById("manage-cookies").style.display = "block"; // Show manage button
    console.log("Cookies accepted, GA4 tracking enabled.");
}

// Deny Cookies and Disable Tracking
function denyCookies() {
    localStorage.setItem("cookie_consent", "denied");

    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    document.getElementById("cookie-banner").style.display = "none";
    document.getElementById("manage-cookies").style.display = "block"; // Show manage button
    console.log("Cookies denied, GA4 tracking disabled.");
}

// Reopen Cookie Banner for Consent Management
function manageCookies() {
    document.getElementById("cookie-banner").style.display = "flex";
}
function loadClarity() {
    if (!window.clarity) { // Prevent multiple loads
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r); t.async=1; t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "ork3584d36");
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

    gtag('config', 'G-9N9V3HXNYT'); // Start tracking
    console.log("GA4 Consent Granted and Initialized");
}



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
