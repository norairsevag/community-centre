// === Community Centre Website - Main JavaScript ===

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
    });
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navItems.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});

// Form submission handling
function handleFormSubmit(event, formType) {
  event.preventDefault();
  const form = event.target;

  // Simple validation
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#e74c3c';
      isValid = false;
    } else {
      field.style.borderColor = '';
    }
  });

  if (isValid) {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.style.cssText = 'background-color: #e8f5ec; color: #4a7c59; padding: 1rem 1.5rem; border-radius: 12px; margin-top: 1rem; font-weight: 500; text-align: center;';

    if (formType === 'contact') {
      successMsg.textContent = "Thank you for your message! We'll get back to you soon.";
    } else if (formType === 'booking') {
      successMsg.textContent = "Your booking request has been submitted! We'll confirm shortly.";
    }

    const existing = form.querySelector('.success-message');
    if (existing) existing.remove();

    form.appendChild(successMsg);
    form.reset();

    setTimeout(() => { successMsg.remove(); }, 5000);
  }
}

// Calendar navigation
function initCalendar() {
  const calendarEl = document.getElementById('calendar-grid');
  if (!calendarEl) return;

  const now = new Date();
  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const events = {
    '2026-06-05': 'Yoga Class',
    '2026-06-08': 'Book Club',
    '2026-06-10': 'Art Workshop',
    '2026-06-12': 'Community Lunch',
    '2026-06-15': 'Kids Craft Day',
    '2026-06-18': 'Gardening Club',
    '2026-06-20': 'Movie Night',
    '2026-06-22': 'Fitness Class',
    '2026-06-25': 'Bake Sale',
    '2026-06-28': 'Summer Fair'
  };

  function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    document.getElementById('calendar-month').textContent = monthNames[currentMonth] + ' ' + currentYear;

    let html = '';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => { html += '<div class="calendar-day-header">' + day + '</div>'; });

    for (let i = 0; i < firstDay; i++) {
      html += '<div class="calendar-day empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = currentYear + '-' + String(currentMonth + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
      const event = events[dateStr] || '';
      const isToday = day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear();

      html += '<div class="calendar-day' + (isToday ? ' today' : '') + '">';
      html += '<div class="day-number">' + day + '</div>';
      if (event) html += '<div class="event">' + event + '</div>';
      html += '</div>';
    }

    calendarEl.innerHTML = html;
  }

  document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  });

  document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  });

  renderCalendar();
}

document.addEventListener('DOMContentLoaded', initCalendar);
