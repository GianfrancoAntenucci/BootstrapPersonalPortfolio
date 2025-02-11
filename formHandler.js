// formHandler.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS - Replace with your User ID
    emailjs.init('Z-a1L7jFwWUT6J_cH');

    const form = document.getElementById('contactForm');
    const currentYear = document.getElementById('currentYear');
    
    // Set current year in footer
    if(currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Form submission handler
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Bootstrap validation
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        try {
            // Send email using EmailJS
            await emailjs.sendForm(
                'service_cygl6nc',  // Replace with your Service ID
                'template_kirbfg9', // Replace with your Template ID
                form
            );

            showAlert('Message sent successfully! 🎉', 'success');
            form.reset();
            form.classList.remove('was-validated');
            
            // Clear validation styles
            form.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });

        } catch (error) {
            console.error('EmailJS Error:', error);
            showAlert(`Failed to send message. Error: ${error.text || 'Please try again later.'}`, 'danger');
        }
    });

    // Real-time validation
    form.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }
        });
    });
});

// Alert notification function
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const contactSection = document.getElementById('contact');
    contactSection.insertBefore(alertDiv, contactSection.firstChild);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
    }, 5000);
}
