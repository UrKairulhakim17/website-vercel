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
    const projectCards = portfolioSection.querySelectorAll('.project-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apabila kad masuk ke dalam viewport, mulakan animasi
                entry.target.classList.add('visible');
                // Animate internal project progress bar
                const projectProgressBar = entry.target.querySelector('.project-progress-bar');
                if (projectProgressBar) {
                    const targetWidth = projectProgressBar.getAttribute('data-width');
                    projectProgressBar.style.width = targetWidth + '%';
                }
            } else {
                // Apabila kad keluar dari viewport, reset animasi
                entry.target.classList.remove('visible');
                // Reset internal project progress bar
                const projectProgressBar = entry.target.querySelector('.project-progress-bar');
                if (projectProgressBar) {
                    projectProgressBar.style.width = '0%';
                }
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the card is visible

    projectCards.forEach(card => {
        cardObserver.observe(card);
    });
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
    const skillItems = skillsSection.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambah kelas visible untuk animasi kad
                entry.target.classList.add('visible');
                // Animasi progress bar di dalam kad
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const targetWidth = progressBar.getAttribute('data-width');
                    progressBar.style.width = targetWidth + '%';
                }
            } else {
                // Reset animasi apabila keluar dari viewport
                entry.target.classList.remove('visible');
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.width = '0%';
                }
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the item is visible

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// Debugging logs
console.log("script.js loaded and executing.");
if (portfolioSection) {
    console.log("portfolioSection found, observer initialized.");
}