// Dapatkan butang toggle dan elemen <html> (untuk tema)
const themeToggle = document.getElementById('toggle-theme');
const rootElement = document.documentElement;

// Remove no-js class once script starts executing
rootElement.classList.remove('no-js');

// Function untuk mengaktifkan/menyimpan tema
function toggleLightMode() {
    // Tukar kelas 'light-theme' pada elemen <html>
    rootElement.classList.toggle('light-theme');

    // Simpan pilihan pengguna dalam localStorage
    if (rootElement.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = "🌙 DARK"; // Tukar teks butang
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ LIGHT'; // Tukar teks butang
    }
}

// Function untuk memuatkan tema dari localStorage bila laman dimuatkan
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Jika tema 'light' disimpan, tambah kelas 'light-theme'
    if (savedTheme === 'light') {
        rootElement.classList.add('light-theme');
        themeToggle.textContent = '🌙 DARK'; // Set teks butang
    } else {
        // Jika tiada atau 'dark', pastikan ia dibuang (tema asal adalah gelap)
        rootElement.classList.remove('light-theme'); 
        themeToggle.textContent = '☀️ LIGHT'; // Set teks butang
    }
}

// Function untuk mengendalikan scroll ke bahagian
function scrollToSection(event) {
    event.preventDefault(); // Halang tingkah laku pautan lalai
    const targetId = event.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer untuk animasi kad portfolio
const portfolioSection = document.getElementById('portfolio-section');
if (portfolioSection) {
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const projectCards = portfolioSection.querySelectorAll('.project-card');
            if (entry.isIntersecting) {
                // Apabila bahagian portfolio masuk ke dalam viewport, mulakan animasi
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                        // Animate internal project progress bar
                        const projectProgressBar = card.querySelector('.project-progress-bar');
                        if (projectProgressBar) {
                            const targetWidth = projectProgressBar.getAttribute('data-width');
                            projectProgressBar.style.width = targetWidth + '%';
                        }
                    }, 150 * index); // 150ms delay between each card
                });
            } else {
                // Apabila bahagian portfolio keluar dari viewport, reset animasi
                projectCards.forEach(card => {
                    card.classList.remove('visible');
                    // Reset internal project progress bar
                    const projectProgressBar = card.querySelector('.project-progress-bar');
                    if (projectProgressBar) {
                        projectProgressBar.style.width = '0%';
                    }
                });
            }
        });
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

    portfolioObserver.observe(portfolioSection);
}


// 1. Fungsi Butang Navigasi
document.querySelectorAll('nav .nav-button, .cta-button').forEach(button => {
    if (button.getAttribute('href').startsWith('#')) {
        button.addEventListener('click', scrollToSection);
    }
});

// 2. Fungsi Butang Tukar Tema
if (themeToggle) {
    themeToggle.addEventListener('click', toggleLightMode);
}

// 3. Muatkan Tema semasa laman dimuatkan
document.addEventListener('DOMContentLoaded', loadTheme);

// 4. Intersection Observer untuk animasi galeri (Efek Scale & Fade)
const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length > 0) {
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2 // Trigger apabila 20% item kelihatan
    });

    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });
}

// Intersection Observer for skill bars animation
const skillsSection = document.getElementById('skills-section');
if (skillsSection) {
    const skillBarsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start animation when skills section is visible
                document.querySelectorAll('#skills-section .progress-bar').forEach((bar, index) => {
                    const targetWidth = bar.getAttribute('data-width');
                    // Add a slight delay for staggered animation
                    setTimeout(() => {
                        bar.style.width = targetWidth + '%';
                    }, 100 * index); 
                });
            } else { // Added for repeating animation
                document.querySelectorAll('#skills-section .progress-bar').forEach(bar => {
                    bar.style.width = '0%'; // Reset width when not intersecting
                });
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    skillBarsObserver.observe(skillsSection);
}

// Debugging logs
console.log("script.js loaded and executing.");
if (portfolioSection) {
    console.log("portfolioSection found, observer initialized.");
}