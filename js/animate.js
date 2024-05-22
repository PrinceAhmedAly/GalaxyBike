
// responsive navbar
const menuBtn = document.getElementById('menuBars');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', function() {

    mobileMenu.classList.toggle('hidden');
});



document.addEventListener("DOMContentLoaded", function() {
    let loader = document.getElementById("loader");
    let content = document.getElementById("content");
    
    loader.style.display = "none";
    content.style.display = "block";
});


// silder functionality 
let currentSlide = 0;
const slider = document.getElementById('slider');
const indicators = document.querySelectorAll('.indicator');

function changeSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(${-currentSlide * 100}%)`;

    // Update active indicator
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % 2;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + 2) % 2;
    updateSlider();
}

const slideChanger = setInterval(nextSlide, 5000); // Auto slide every 5 seconds
