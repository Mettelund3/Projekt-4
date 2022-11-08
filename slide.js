// Lille slideshow start //

const wrapper = document.querySelector('.wrapper') // Const bliver her brugt til at definere variablen Wrapper, som vi siger er lige med document.querySelector('.wrapper') som ser i css filen efter den første element samme navnet wrapper og returnere den her. //

let pressed = false // Variable pressed, som vi sætter til false //
let startX = 0 // Variable startX, som vi sætter til 0 //

wrapper.addEventListener('mousedown', function(e) { //Her tilføjes en eventlistener til wrapperen, som her ser efter om man holder musen nede og hvis man gør det aktiveres der en lokal funktion her som sætter pressed variablen til true, fordi man netop musen nemlig er blevet trykket på. //
    pressed = true
    startX = e.clientX // dernæst sætter vi startX lige med e.clientX som vil sige at når man en muse funktion aktiveres som mousedown i dette tilfælde så returnerer den de horizontale cordinater altså x cordinaterne inden for wrapperen her.//
    this.style.cursor = 'grabbing' //Her tilføjes en style til muse cursoren så den bliver vist som grabbing når musen trykkes ned//
})

wrapper.addEventListener('mouseleave', function(e) { // Her tilføjes en eventlistener som sørger for at sætte pressed til false når musen ikke længere befinder sig inden for wrapperen
    pressed = false
    startX = e.clientX
})

window.addEventListener('mouseup', function(e) { //Dennes formål er lige modsat den her oppe, hvor funktionen siger hvad der skal ske når musen ikke trykkes ned//
    pressed = false
    wrapper.style.cursor = 'grab'
})

wrapper.addEventListener('mousemove', function(e) { //Her er der en eventlistener som ser på om musen bevæger sig inde i wrapperen
    if(!pressed) {   // Her har vi en if condition som har et ! foran pressed hvilket invertere værdien af pressed. Det vil sige at i stedet for at den er pressed false så er den pressed true. Så den siger faktisk hvis pressed = true så returner, dette stykke kode hernede://
        return
    }

    this.scrllLeft += startX - e.clientX   //
})

// Lille slideshow slut //











// Slideshow start // 

let slideIndex = 1;   
showSlides(slideIndex);   


function plusSlides(n) {  
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

// Slideshow slut //