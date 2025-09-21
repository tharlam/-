// Elements
const navBar = document.querySelector('.main-nav');
const background = document.querySelector('.parallax-background');
const bannerContent = document.querySelector('.banner-content');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('.page-section');

// Parallax and nav visibility
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Show/hide nav bar
    navBar.classList.toggle('visible', scrollY > 50);

    // Parallax zoom
    const scale = 1 + scrollY * 0.0005;
    background.style.transform = `scale(${scale})`;

    // Banner text movement
    const translateY = scrollY * 0.3;
    bannerContent.style.transform = `translateY(${translateY}px)`;

    // Scrollspy active link
    updateActiveLink();
});

// Smooth scroll with offset
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const navHeight = navBar.offsetHeight;
            const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: sectionTop - navHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Scrollspy logic
function updateActiveLink() {
    let index = sections.length;

    while (--index >= 0) {
        const sectionTop = sections[index].offsetTop;
        if (window.scrollY + window.innerHeight / 2 >= sectionTop) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeId = sections[index].getAttribute('id');
            const activeLink = document.querySelector(`.main-nav a[href="#${activeId}"]`);
            if (activeLink) activeLink.classList.add('active');
            break;
        }
    }
}

// Staggered animation
function animateStaggered(elements) {
    elements.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
            el.setAttribute('aria-hidden', 'false');
        }, i * 200);
    });
}

// IntersectionObserver for reveal sections
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animated-element');
            animateStaggered(animatedElements);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.reveal-section, .history-section').forEach(section => {
    observer.observe(section);
});

// scroll progress bar
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});
