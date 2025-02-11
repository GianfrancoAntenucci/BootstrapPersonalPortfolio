


document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your user ID
    (function() {
        emailjs.init("Z-a1L7jFwWUT6J_cH");
    })();

    const form = document.getElementById('contactForm');


    async function handleFormSubmit(form) {
        try {
            await emailjs.sendForm(
                'service_cygl6nc', 
                'template_kirbfg9', 
                form
            );
            
            showAlert('Message sent successfully!', 'success');
            form.reset();
            form.classList.remove('was-validated');
            
            form.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid');
            });
        } catch (error) {
            showAlert('Error sending message. Please try again.', 'danger');
            console.error('EmailJS Error:', error);
        }
    }
    
    
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
    contactSection.insertBefore(alertDiv, contactSection.firstChild);
    
    // Auto-dismiss alert after 5 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 150);
    }, 5000);
}