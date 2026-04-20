// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const backToTopBtn = document.getElementById('backToTop');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-link');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to Top Button
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Back to Top Button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Simple form validation and email sending
const consultationForm = document.getElementById('consultationForm');
if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            company: document.getElementById('company').value.trim(),
            country: document.getElementById('country').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Basic validation
        if (!formData.fullName || !formData.email || !formData.phone || !formData.country || !formData.message) {
            alert('Please fill in all required fields marked with *');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Create beautiful plain text email (compatible with all email clients)
        const emailSubject = `🎯 Consultation Request from ${formData.fullName} - Arka Fintech`;
        
        const emailBody = `
╔══════════════════════════════════════════════════════════════╗
                         ARKA FINTECH
                CONSULTATION REQUEST - URGENT
╚══════════════════════════════════════════════════════════════╝

📋 CLIENT INFORMATION
────────────────────────────────────────────────────────────
• 🔹 Full Name:    ${formData.fullName}
• 📧 Email:        ${formData.email}
• 📞 Phone:        ${formData.phone}
• 🏢 Company:      ${formData.company || 'Not specified'}
• 🌍 Country:      ${formData.country}

────────────────────────────────────────────────────────────
💬 CLIENT MESSAGE
────────────────────────────────────────────────────────────
${formData.message}

────────────────────────────────────────────────────────────
📅 REQUEST DETAILS
────────────────────────────────────────────────────────────
• Submitted:      ${new Date().toLocaleString()}
• Priority:       ⚡ URGENT - Response within 24 hours
• Source:         Arka Fintech Website Contact Form

────────────────────────────────────────────────────────────
🎯 ACTION REQUIRED
────────────────────────────────────────────────────────────
1. Contact client within 24 hours
2. Schedule initial consultation
3. Assign to appropriate financial expert

────────────────────────────────────────────────────────────
📍 ARKA FINTECH CONTACT
────────────────────────────────────────────────────────────
📞 Australia: +61 466 799 077
📞 India:     +91 94277 17769  
📞 Singapore: +65 6011 9402
📧 Email:     info@arkafintech.com.au

╔══════════════════════════════════════════════════════════════╗
     This is an automated inquiry from Arka Fintech website
     Please respond within 24 hours as promised to client.
╚══════════════════════════════════════════════════════════════╝

#ConsultationRequest #ArkaFintech #NewClient #UrgentResponse
`;
        
        // Encode the subject and body for mailto link
        const encodedSubject = encodeURIComponent(emailSubject);
        const encodedBody = encodeURIComponent(emailBody);
        
        // Create mailto link
        const mailtoLink = `mailto:kashyapshashwat77@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
        
        // Show confirmation with preview
        const confirmationMessage = `
✅ FORM SUBMITTED SUCCESSFULLY!

Thank you ${formData.fullName}!

Your consultation request has been prepared and is ready to send.

📧 EMAIL PREVIEW:
────────────────
To: kashyapshashwat77@gmail.com
Subject: ${emailSubject}

Your information will be sent in a professionally formatted email.

────────────────
Click OK to open your email client and send this request.
We will contact you within 24 hours as promised.
        `;
        
        if (confirm(confirmationMessage)) {
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form after a short delay
            setTimeout(() => {
                consultationForm.reset();
                
                // Show final confirmation
                setTimeout(() => {
                    alert(`🎉 Thank you ${formData.fullName}!\n\nYour consultation request has been sent successfully!\n\n✅ Our team will review your request\n✅ We'll contact you within 24 hours\n✅ Check your email for confirmation\n\nLooking forward to transforming your financial operations!`);
                    
                    // Scroll to top of contact section
                    document.getElementById('contact').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 2000);
            }, 1000);
        }
    });
}

// Add real-time validation feedback
const formInputs = document.querySelectorAll('#consultationForm input, #consultationForm select, #consultationForm textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.required && !this.value.trim()) {
            this.style.borderColor = '#f44336';
        } else if (this.type === 'email' && this.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value.trim())) {
                this.style.borderColor = '#f44336';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    });
    
    input.addEventListener('input', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
