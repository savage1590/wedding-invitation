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

    // 4. RSVP Form Telegram Integration
    const rsvpForm = document.querySelector('form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            
            // Get data
            const name = document.getElementById('name').value;
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            
            // Format message
            const attendanceText = attendance === 'yes' ? '✅ Прийде' : '❌ Не зможе бути';
            const text = `💌 <b>Нова відповідь на запрошення!</b>\n\n👤 <b>Гість:</b> ${name}\n❓ <b>Статус:</b> ${attendanceText}`;

            // Bot config
            const token = '8458202020:AAHTztTLWOjXOVHcTGBoojkLLxTRDz1YOvk';
            const chatId = '534547134';
            const url = `https://api.telegram.org/bot${token}/sendMessage`;

            btn.innerText = 'ВІДПРАВЛЕННЯ...';
            btn.disabled = true;

            const fullUrl = `${url}?chat_id=${chatId}&text=${encodeURIComponent(text)}&parse_mode=HTML`;

            fetch(fullUrl)
            .then(response => {
                if(response.ok) {
                    btn.innerText = 'ВІДПРАВЛЕНО';
                    btn.classList.add('bg-beige', 'text-chocolate');
                    btn.classList.remove('bg-chocolate', 'text-beige');
                    e.target.reset();
                } else {
                    btn.innerText = 'ПОМИЛКА';
                }
            })
            .catch(error => {
                btn.innerText = 'ПОМИЛКА МЕРЕЖІ';
            })
            .finally(() => {
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.remove('bg-beige', 'text-chocolate');
                    btn.classList.add('bg-chocolate', 'text-beige');
                    btn.disabled = false;
                }, 3000);
            });
        });
    }
});

// Preloader Logic
const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('opacity-0')) {
        preloader.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => preloader.remove(), 1000);
    }
};

window.addEventListener('load', hidePreloader);
setTimeout(hidePreloader, 800); // 800ms max delay to prevent long hangs
