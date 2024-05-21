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

setInterval(nextSlide, 5000); // Auto slide every 5 seconds

// scorlling events animation

// let lastScrollTop = 0;

// window.addEventListener("scroll", function () {
//   const st = window.scrollY;

//   if (st > lastScrollTop) {
//     // Scrolling down
//     document.querySelector('.road .left h2').style.animationDirection = 'normal';
//   } else {
//     // Scrolling up
//     document.querySelector('.road .left h2').style.animationDirection = 'reverse';
//   }

//   lastScrollTop = st;
// });