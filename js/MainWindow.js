document.addEventListener('DOMContentLoaded', function() {
    initNavigation();

    initCharts();


});

function initNavigation() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            navLinks.forEach(item => item.classList.remove('active'));

            this.classList.add('active');


            const title = this.querySelector('span').textContent;
            document.querySelector('.h2').textContent = title;
        });
    });

    const toggleSidebar = function() {
        const sidebar = document.getElementById('sidebar');
        const width = window.innerWidth;

        if (width < 768) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    };

    toggleSidebar();
    window.addEventListener('resize', toggleSidebar);
}

// Initialize charts using Chart.js
function initCharts() {
    // Loan Performance Chart
    const loanPerformanceCtx = document.getElementById('loanPerformanceChart').getContext('2d');

    // Sample data
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const disbursedLoans = [180000, 220000, 240000, 190000, 260000, 290000];
    const repaidLoans = [120000, 150000, 170000, 160000];
}