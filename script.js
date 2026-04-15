// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = '#1a1a1a';
        navLinks.style.padding = '20px';
    });

    // 2. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3. Booking Form Validation & LocalStorage
    const bookingForm = document.getElementById('bookingForm');
    const feedback = document.getElementById('formFeedback');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;

        // Basic validation: Check if dates are valid
        if (new Date(checkin) >= new Date(checkout)) {
            feedback.textContent = "Check-out date must be after check-in date.";
            feedback.style.color = "#ff4d4d";
            feedback.classList.remove('hidden');
            return;
        }

        // Save to LocalStorage
        const bookingData = { name, checkin, checkout, guests: document.getElementById('guests').value };
        localStorage.setItem('latestBooking', JSON.stringify(bookingData));

        // Show Success
        bookingForm.classList.add('hidden');
        feedback.innerHTML = `<h3>Thank you, ${name}!</h3><p>Your luxury stay is being prepared. We've saved your details.</p>`;
        feedback.style.color = "#c5a880";
        feedback.classList.remove('hidden');
    });

    // 4. Back to Top Button
    const topBtn = document.getElementById('backToTop');
    window.onscroll = () => {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    };

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});