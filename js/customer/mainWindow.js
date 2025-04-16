document.addEventListener('DOMContentLoaded', function() {
    const repaymentChartCtx = document.getElementById('repaymentChart').getContext('2d');

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const principalData = [8500, 8200, 7900, 7600, 7300, 7000, 6700, 6400, 6100];
    const interestData = [1500, 1450, 1400, 1350, 1300, 1250, 1200, 1150, 1100];
    const paymentData = [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000];

    const principalGradient = repaymentChartCtx.createLinearGradient(0, 0, 0, 300);
    principalGradient.addColorStop(0, 'rgba(67, 97, 238, 0.8)');
    principalGradient.addColorStop(1, 'rgba(67, 97, 238, 0.2)');

    const interestGradient = repaymentChartCtx.createLinearGradient(0, 0, 0, 300);
    interestGradient.addColorStop(0, 'rgba(6, 214, 160, 0.8)');
    interestGradient.addColorStop(1, 'rgba(6, 214, 160, 0.2)');

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(26, 26, 46, 0.9)',
                titleFont: {
                    size: 13,
                    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                },
                bodyFont: {
                    size: 12,
                    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                },
                padding: 12,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                grid: {
                    borderDash: [5, 5],
                    drawBorder: false
                },
                ticks: {
                    callback: function(value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: false,
            axis: 'x'
        },
        elements: {
            line: {
                tension: 0.4
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 5
            }
        }
    };

    // Create the chart
    const repaymentChart = new Chart(repaymentChartCtx, {
        type: 'line',
        data: {
            labels: monthLabels,
            datasets: [
                {
                    label: 'Principal',
                    data: principalData,
                    backgroundColor: principalGradient,
                    borderColor: '#4361ee',
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: 'Interest',
                    data: interestData,
                    backgroundColor: interestGradient,
                    borderColor: '#06d6a0',
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: 'Payment',
                    data: paymentData,
                    backgroundColor: 'transparent',
                    borderColor: '#f72585',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 4,
                    pointBackgroundColor: '#f72585'
                }
            ]
        },
        options: chartOptions
    });

    // Mobile menu toggle functionality
    const sidebarToggleBtn = document.querySelector('.btn-notification');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (sidebarToggleBtn && sidebar && mainContent) {
        sidebarToggleBtn.addEventListener('dblclick', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });
    }

    // Add hover effects to the table rows
    const tableRows = document.querySelectorAll('.loans-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });

        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Notification counter (for demo purposes)
    const notificationBtn = document.querySelector('.btn-notification');
    const notificationBadge = notificationBtn.querySelector('.notification-badge');

    notificationBtn.addEventListener('click', function() {
        let count = parseInt(notificationBadge.textContent);
        if (count > 0) {
            notificationBadge.textContent = count - 1;
            showNotification('Notification marked as read');
        }

        if (parseInt(notificationBadge.textContent) === 0) {
            notificationBadge.style.display = 'none';
        }
    });

    // Add new loan button functionality
    const addLoanBtn = document.querySelector('.btn-add');

    addLoanBtn.addEventListener('click', function() {
        showNotification('New loan form would open here');
    });

    // Pay now button functionality
    const payNowBtns = document.querySelectorAll('.payment-item .btn-primary');

    payNowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const paymentInfo = this.closest('.payment-item').querySelector('.payment-info h4').textContent;
            showNotification(`Payment initiated for ${paymentInfo}`);
        });
    });

    // Function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: '1000',
            minWidth: '250px',
            transform: 'translateY(100px)',
            opacity: '0',
            transition: 'all 0.3s ease'
        });

        // Add the notification to the DOM
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);

        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            closeNotification(notification);
        });

        // Auto-close after 5 seconds
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
    }

    // Function to close notification
    function closeNotification(notification) {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';

        // Remove from DOM after animation completes
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    // Initialize loan payment details toggle
    const loanDetailToggles = document.querySelectorAll('.loan-detail-toggle');
    loanDetailToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const detailsPanel = this.closest('tr').nextElementSibling;
            if (detailsPanel && detailsPanel.classList.contains('loan-details')) {
                detailsPanel.classList.toggle('expanded');
                this.querySelector('i').classList.toggle('fa-chevron-down');
                this.querySelector('i').classList.toggle('fa-chevron-up');
            }
        });
    });

    // Initialize date pickers if they exist
    const datePickers = document.querySelectorAll('.date-picker');
    if (datePickers.length > 0) {
        datePickers.forEach(picker => {
            // This would normally use a date picker library
            picker.addEventListener('focus', function() {
                showNotification('Date picker would open here');
            });
        });
    }

    // Add export functionality
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showNotification('Exporting data to CSV...');
            // Simulating export delay
            setTimeout(() => {
                showNotification('Data successfully exported');
            }, 1500);
        });
    }

    // Initialize any tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            if (tooltipText) {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = tooltipText;

                // Position and style tooltip
                Object.assign(tooltip.style, {
                    position: 'absolute',
                    top: `${this.getBoundingClientRect().top - 40}px`,
                    left: `${this.getBoundingClientRect().left + (this.offsetWidth / 2)}px`,
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(26, 26, 46, 0.9)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    zIndex: '1001',
                    pointerEvents: 'none',
                    opacity: '0',
                    transition: 'opacity 0.2s ease'
                });

                document.body.appendChild(tooltip);

                // Show tooltip
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                }, 10);

                // Store tooltip reference
                this.tooltip = tooltip;
            }
        });

        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });
});

// payment section

document.addEventListener('DOMContentLoaded', function() {
    const paymentModal = document.getElementById('payment-modal');
    const openModalBtn = document.getElementById('open-payment-modal-btn');
    const closeModalBtn = document.getElementById('close-payment-modal');
    const paymentForm = document.getElementById('payment-form');

    openModalBtn.addEventListener('click', function() {
        paymentModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    // paymentForm.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //
    //     const amount = document.getElementById('payment-amount').value;
    //     const paymentType = document.getElementById('payment-type').value;
    //
    //     if (amount <= 0) {
    //         alert('Please enter a valid payment amount');
    //         return;
    //     }
    //
    //
    //     alert(`Payment of $${amount} via ${paymentType} processed successfully!`);
    //
    //     paymentForm.reset();
    //     paymentModal.style.display = 'none';
    // });
});