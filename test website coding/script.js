// Dapatkan butang toggle dan elemen <html> (untuk tema)
const themeToggle = document.getElementById('toggle-theme');
const rootElement = document.documentElement;

// Function untuk mengaktifkan/menyimpan tema
function toggleLightMode() {
    // Tukar kelas 'light-theme' pada elemen <html>
    rootElement.classList.toggle('light-theme');

    // Simpan pilihan pengguna dalam localStorage
    if (rootElement.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = "🌙 Tema Gelap"; // Tukar teks butang
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Tema Cerah'; // Tukar teks butang
    }
}

// Function untuk memuatkan tema dari localStorage bila laman dimuatkan
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Jika tema 'light' disimpan, tambah kelas 'light-theme'
    if (savedTheme === 'light') {
        rootElement.classList.add('light-theme');
        themeToggle.textContent = '🌙 Tema Gelap'; // Set teks butang
    } else {
        // Jika tiada atau 'dark', pastikan ia dibuang (tema asal adalah gelap)
        rootElement.classList.remove('light-theme'); 
        themeToggle.textContent = '☀️ Tema Cerah'; // Set teks butang
    }
}

// Function untuk menunjukkan bahagian yang dipilih dan menyembunyikan yang lain
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-container section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// 1. Fungsi Butang Navigasi
// Butang navigasi berfungsi melalui fungsi showSection() dalam HTML.

// 2. Fungsi Butang Tukar Tema
if (themeToggle) {
    themeToggle.addEventListener('click', toggleLightMode);
}

// 3. Muatkan Tema semasa laman dimuatkan
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    // Tunjukkan bahagian pengenalan secara lalai apabila laman dimuatkan
    showSection('pengenalan-section'); 
});
