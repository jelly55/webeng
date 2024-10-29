// scripts/components/sidebar.js

function initSidebar() {
    // Toggle sidebar on mobile
    $('#sidebarToggle').on('click', toggleSidebar);

    // Handle navigation
    $('.sidebar-link').on('click', handleNavigation);

    // Set active link based on current page
    setActiveLink();
}

function toggleSidebar() {
    $('.sidebar').toggleClass('open');
}

function handleNavigation(e) {
    e.preventDefault();
    const target = $(this).attr('href');

    // If it's a single page app, you might want to load content dynamically here
    // For now, we'll just navigate to the page
    window.location.href = target;
}

function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    $('.sidebar-link').removeClass('active');
    $(`.sidebar-link[href*="${currentPage}"]`).addClass('active');
}

