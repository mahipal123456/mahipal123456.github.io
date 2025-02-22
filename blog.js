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
function showPopup() {
    const popup = document.getElementById('support-popup');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('support-popup');
    popup.style.display = 'none';
}

function redirectToSupport() {
    closePopup(); // Close the popup
    window.location.href = 'index.html#support'; // Redirect to the support page with a hash
}

// Show the popup 10 seconds after the page loads
window.onload = function() {
    setTimeout(showPopup, 30000); // 10000 milliseconds = 10 seconds
};
