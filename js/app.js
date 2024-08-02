// -------------------------- Preloader ----------------------------

document.addEventListener("DOMContentLoaded", function() {
    // Simulate content loading delay
    setTimeout(function() {
      // Hide the preloader
      document.getElementById('preloader').classList.add('hidden');
    }, 1000); // Adjust the delay time as needed
});

// -------------------------- Age Verification ---------------------

const AgeVerification = document.getElementById('age-verification');
const AgeVerificationButton = document.querySelectorAll('#age-verification .btn-01');

AgeVerificationButton[0].addEventListener('click', function(){
    AgeVerification.classList.add('hidden');
});

// --------------------- Slogan Rotation beim Scrollen ---------------------

// Verweis auf das Slogan-Element
const slogan = document.getElementById('slogan-text');
const Main = document.querySelector('main');

// Funktion zum Drehen des Slogans beim vertikalen Scrollen
function handleScrollVertical() {
    // Berechne den Rotationswinkel basierend auf der Scrollposition
    let rotationAngle = window.scrollY * 0.15 % 360; // Passen Sie den Wert 0.15 an, um die Drehgeschwindigkeit zu ändern
  
    // Setze den Rotationswinkel des Slogans
    slogan.style.transform = `rotate(${rotationAngle}deg)`;
  }

function handleScrollHorizontal() {
    // Berechne den Rotationswinkel basierend auf der Scrollposition
    let rotationAngle = Main.scrollLeft * 0.15 %360; // Passen Sie den Wert 0.15 an, um die Drehgeschwindigkeit zu ändern
  
    // Setze den Rotationswinkel des Slogans
    slogan.style.transform = `rotate(${rotationAngle}deg)`;
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollVertical);
Main.addEventListener('scroll', handleScrollHorizontal);

// --------------------- Navigation ---------------------

const MainNavButton = document.getElementById('main-nav-btn');
const MainNav = document.getElementById('main-nav');
const Body = document.querySelector('body');
const MainNavLinks = document.querySelectorAll('.main-nav a');
const header = document.querySelector('header');

for(let i = 0; i < MainNavLinks.length; i++){
    MainNavLinks[i].addEventListener('click', toggleNav);
}

function toggleNav() {
    MainNav.classList.toggle('active');
    MainNavButton.classList.toggle('active');
    Body.classList.toggle('no-scroll');
    header.classList.toggle('active');
}

MainNavButton.addEventListener('click', toggleNav);

// --------------------- Slider Funktionen ---------------------


const Slider = document.querySelectorAll('.slider');
const sliderContainer = document.querySelectorAll('.slider-container');

// Slider Dots
function changeSlide(e){
    const slider = e.target; // Slider 
    const sliderElement = slider.children[0]; // Slider Element
    const sliderElementCount = slider.children.length; // Anzahl der Elemente im Slider

    const sliderWidth = slider.scrollWidth; // Breite des Sliders
    const sliderElementWidth = sliderElement.offsetWidth; // Breite eines Elements im Slider
    
    const sliderPosition = Math.ceil(slider.scrollLeft); // Scollposition des Sliders

    const x =  Math.floor((sliderPosition) / sliderElementWidth); // Berechnung des aktuellen Slides

    const dots = slider.nextElementSibling; // Dots Container
    
    const arrowLeft = slider.previousElementSibling.children[0]; // Linker Pfeil
    const arrowRight = slider.previousElementSibling.children[1]; // Rechter Pfeil

    for (let i = 0; i < sliderElementCount; i++){
        if(i == x){
            dots.children[i].classList.add('active');
        }else{
            dots.children[i].classList.remove('active');
        }
    }
    // Ausblenden des rechten Pfeils, wenn das Ende des Sliders erreicht ist
    if(x == sliderElementCount - 1){
        arrowRight.style.opacity = 0.3;
        arrowRight.style.pointerEvents = 'none';
    }

    // Einblenden des rechten Pfeils, wenn der Slider nach links gescrollt wird
    if(sliderPosition < sliderWidth - e.target.clientWidth){
        arrowRight.style.opacity = 1;
        arrowRight.style.pointerEvents = 'auto';
    }

    // Ausblenden des linken Pfeils, wenn der Anfang des Sliders erreicht ist
    if(sliderPosition == 0){
        arrowLeft.style.opacity = 0.3;
        arrowLeft.style.pointerEvents = 'none'; // Pfeil kann nicht mehr angeklickt werden
    }

    // Einblendung des linken Pfeils, wenn der Slider nach rechts gescrollt wird
    if(sliderPosition > 0){
        arrowLeft.style.opacity = 1;
        arrowLeft.style.pointerEvents = 'auto';
    }
}

for(let i = 0; i < Slider.length; i++){
    Slider[i].addEventListener('scroll', changeSlide);
}

// Slider Arrows

function slideLeft(e){ // e.target = Pfeil
    const slider = e.target.parentElement.parentElement.children[1]; // Slider
    const sliderWidth = slider.children[0].clientWidth; // Breite eines Elements im Slider

    slider.scrollLeft -= sliderWidth; // Scrollen um die Breite eines Elements
}

function slideRight(e){ // e.target = Pfeil
    const slider = e.target.parentElement.parentElement.children[1]; // Slider
    const sliderWidth = slider.children[0].clientWidth; // Breite eines Elements im Slider

    slider.scrollLeft += sliderWidth; // Scrollen um die Breite eines Elements
}

for(let i = 0; i < sliderContainer.length; i++){
    // Linker Pfeil
    sliderContainer[i].children[0].children[0].addEventListener('click', slideLeft);
    
    // Rechter Pfeil
    sliderContainer[i].children[0].children[1].addEventListener('click', slideRight);

    // Der linke Pfeil wird beim Laden der Seite ausgeblendet
    if(sliderContainer[i].children[1].scrollLeft == 0){
        sliderContainer[i].children[0].children[0].style.opacity = 0.3;
        sliderContainer[i].children[0].children[0].style.pointerEvents = 'none'; // Pfeil kann nicht mehr angeklickt werden
    }
}

// --------------------- Horizontales Scrollen ---------------------

function horizontalScroll(e) {
    var delta = e.deltaY; // Scrollrichtung
    var scrollSpeed = 10; // Scrollgeschwindigkeit
    var container = document.querySelector('main');
    container.scrollLeft += (delta || deltatrackpad) * scrollSpeed;
    e.preventDefault();
}

function checkMediaQuery(MediaDesktop) {
    var container = document.querySelector('main'); // Container für das horizontale Scrollen

    if (MediaDesktop.matches) {
        container.addEventListener('wheel', horizontalScroll);
    } else {
        container.removeEventListener('wheel', horizontalScroll);
    }
}

var MediaDesktop = window.matchMedia("(min-width: 1024px) and (orientation: landscape)"); // Media Query für Desktop

checkMediaQuery(MediaDesktop);

MediaDesktop.addEventListener('change', function(e) {
    checkMediaQuery(e.currentTarget);
});


// --------------------- Custom Scrollbar ---------------------


// Funktion zum Aktualisieren der Position des Schieberegler-Griffs
    function updateSliderHandlePosition() {
        // Verweise auf die Schieberegler-Elemente
    const sliderTrack = document.getElementById('custom-slider');
    const sliderHandle = sliderTrack.children[0];

    // Berechnung der Dimensionen
    const itemWidth = document.querySelector('section').clientWidth;
    const containerWidth = document.querySelector('main').scrollWidth;

    // Setze die Breite des Schieberegler-Griffs
    sliderHandle.style.width = (itemWidth / containerWidth * 100) + 1 + '%';

    // Berechne die aktuelle Scrollposition und den Prozentsatz
    const scrollPosition = document.querySelector('main').scrollLeft;
    const scrollPercentage = Math.round(scrollPosition / containerWidth * 100);
    
    sliderHandle.style.left = scrollPercentage + '%';
}

// Ereignislistener für das Scroll-Ereignis hinzufügen
document.querySelector('main').addEventListener('scroll', updateSliderHandlePosition);

// Initialisiere die Position des Schieberegler-Griffs
updateSliderHandlePosition();

// Breite des Schieberegler-Griffs aktualisieren, wenn sich die Fenstergröße ändert
window.addEventListener('resize', function() {
    updateSliderHandlePosition();
}); 







