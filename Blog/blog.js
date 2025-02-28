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
// STEP 1: Check if the user has already given consent
window.onload = function () {
    let consent = localStorage.getItem("cookie_consent");

    if (consent === "granted" || consent === "denied") {
        document.getElementById("cookie-banner").style.display = "none";
    }
};

// STEP 2: Function to accept cookies and update consent mode
function acceptCookies() {
    localStorage.setItem("cookie_consent", "granted");

    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });

    document.getElementById("cookie-banner").style.display = "none";
}

// STEP 3: Function to deny cookies (keeps default "denied" state)
function denyCookies() {
    localStorage.setItem("cookie_consent", "denied");

    gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    document.getElementById("cookie-banner").style.display = "none";
}
