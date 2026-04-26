document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Fade in only)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
        });
    }

    // 2. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 3. Countdown Timer Logic
    // Target date: July 18, 2026 13:00:00
    const targetDate = new Date('2026-07-18T13:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Event has passed
            daysEl.innerText = '00';
            hoursEl.innerText = '00';
            minutesEl.innerText = '00';
            secondsEl.innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format to always have 2 digits
        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    // Initial call
    updateCountdown();
    // Update every second
    setInterval(updateCountdown, 1000);

    // RSVP form basic prevent default behavior
    const rsvpForm = document.querySelector('form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'ВІДПРАВЛЕНО';
            btn.classList.add('bg-beige', 'text-chocolate');
            btn.classList.remove('bg-chocolate', 'text-beige');
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-beige', 'text-chocolate');
                btn.classList.add('bg-chocolate', 'text-beige');
                e.target.reset();
            }, 3000);
        });
    }
});
