// Lille slideshow start //

const wrapper = document.querySelector('.wrapper')

let pressed = false
let startX = 0

wrapper.addEventListener('mousedown', function(e) {
    pressed = true
    startX = e.clientX
    this.style.cursor = 'grabbing'

    console.log(startX)
})

wrapper.addEventListener('mouseleave', function(e) {
    pressed = false
    startX = e.clientX
})

window.addEventListener('mouseup', function(e) {
    pressed = false
    wrapper.style.cursor = 'grab'
})

wrapper.addEventListener('mousemove', function(e) {
    if(!pressed) {
        return
    }

    this.scrollLeft += startX - e.clientX
})

// Lille slideshow slut //

// Stort slideshow start // 

let slideIndex = 1;   //Slide nummer i slideindexen, sørger for den starter på første slide hver gang//
showSlides(slideIndex);   //Viser slide tilsvarende nummeret den er nået til i slideIndex

function plusSlides(n) {  //Funktionen der aktiveres når der trykkes på pilene 
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
  }

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i=0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Stort slideshow slut //