// formHandler.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init('Z-a1L7jFwWUT6J_cH');

    const form = document.getElementById('contactForm');
    const currentYear = document.getElementById('currentYear');
    let isSubmitting = false;
    let alertInstance = null;

    // Set current year
    if(currentYear) currentYear.textContent = new Date().getFullYear();

    // Remove any existing submit listeners to prevent duplicates
    form.replaceWith(form.cloneNode(true));
    const freshForm = document.getElementById('contactForm');

    freshForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (isSubmitting) return;
        
        const submitBtn = freshForm.querySelector('button[type="submit"]');
        
        try {
            isSubmitting = true;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

            if (!freshForm.checkValidity()) {
                freshForm.classList.add('was-validated');
                return;
            }

            const response = await emailjs.sendForm(
                'service_cygl6nc',  // Replace with your Service ID
                'template_kirbfg9', // Replace with your Template ID
                freshForm
            );

            if (alertInstance) alertInstance.close();
            showAlert('Message sent successfully! 🎉', 'success');
            freshForm.reset();
            freshForm.classList.remove('was-validated');
            
            freshForm.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });

        } catch (error) {
            console.error('EmailJS Error:', error);
            if (alertInstance) alertInstance.close();
            showAlert(`Failed to send: ${error.text || 'Please try again'}`, 'danger');
        } finally {
            isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    // Real-time validation
    freshForm.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('is-valid', 'is-invalid');
            input.checkValidity() ? 
                input.classList.add('is-valid') : 
                input.classList.add('is-invalid');
        });
    });
});

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const contactSection = document.getElementById('contact');
    const existingAlert = contactSection.querySelector('.alert');
    if (existingAlert) existingAlert.remove();
    
    contactSection.prepend(alertDiv);
    
    // Initialize Bootstrap alert properly
    alertInstance = new bootstrap.Alert(alertDiv);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertInstance.close();
    }, 5000);
}
