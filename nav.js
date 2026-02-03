document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
    // Active Link Highlighting (Scroll Spy) for Index Page
    const sections = document.querySelectorAll('section[id]');

    // Only run this on pages with the relevant sections (Home, Services, etc.)
    if (document.getElementById('home') && document.getElementById('services')) {
      window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          // Offset of 150px provides a good trigger point as user scrolls down
          if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
          }
        });

        const navLinksList = document.querySelectorAll('.nav-links a');
        navLinksList.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href');

          // Match simple anchor (#service) or full anchor (index.html#service)
          if (current && (href === `#${current}` || href.includes(`#${current}`))) {
            link.classList.add('active');
          } else if (current === 'home' && (href === 'index.html' || href === '#home')) {
            // Special case for Home link which might point to index.html or #home
            link.classList.add('active');
          }
        });
      });
    }

    // Custom Sci-Fi Cursor Logic
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');

    cursor.classList.add('cursor-dot');
    cursorFollower.classList.add('cursor-follower');

    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      // Slight delay for follower is handled via CSS transition, just update pos
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 50);
    });

    document.addEventListener('mousedown', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    document.addEventListener('mouseup', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .card');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('active');
        cursor.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('active');
        cursor.classList.remove('active');
      });
    });
  }
});
