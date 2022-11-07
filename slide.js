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
showSlides(slideIndex);   //Viser slide tilsvarende nummeret den er nået til i slideIndex//

function plusSlides(n) {  //Funktionen der aktiveres når der trykkes på pilene. n er en parameter som vil sige at det er en placeholder for den værdi der vil blive ændret i en senere funktion// 
    showSlides(slideIndex += n); // Her pluses slideIndexets værdi med n, og assigner den nye værdi til variablen slideindex, hvilket i sidste ende vil skifte slided. værdien n kommer her an på om du trykke på ventre eller højre pil på slideshowet, hvilket vil sige at hvis du trykker på venstre pil vil n være -1 men hvis du trykker på den højre vil det bare være 1 //
}

function currentSlide(n) { // Denne funktion hører til prikkerne under slideshowet. Hver prik har fået en værdi eller nr fra 1-4 som er tilsvarende et slide fra 1-4. værdien n kommer her an på hvilken prik du trykker på (kan ses i html)//
    showSlides(slideIndex = n); // Viser slide afhængig af slideindexets værdi og sætter slideIndexets værdi til n, som så afhænger af hvilken prik du trykkede på.//
  }

function showSlides(n) { //Funktionen der viser slideshowet ud fra parameteret n, som bestemmes med navigations elementerne//
    let i; //Variabel i, som bliver anvendt senere//
    let slides = document.getElementsByClassName("mySlides"); //Variable for slidesne//
    let dots = document.getElementsByClassName("dot"); //variable for navigations prikkerne//
    if (n > slides.length) {slideIndex = 1} // if condition der siger hvis n værdien går over længden på slideIndexen, så sæt den tilbage til 1//
    if (n < 1) {slideIndex = slides.length} // if condition der siger hvis n værdien er mindre end 1, så bliver den lige med slidelength, som altså er 4, så den går bare til det sidste slide//
    for (i=0; i < slides.length; i++) {     //så har vi et for loop, som starter med at sige at i variablen = 0, derefter har vi en condition, som gør at loopet kun executer hvis værdien af i er mindre end slidelength. Til sidst står der i++ som øger værdien af i hver gang loopet er executed //
        slides[i].style.display = "none";   //Funktionen som loopet executer hvis conditionen er mødt; dette gør at efter værdien går op efter man går videre til næste slide, så sætter den en display none på det sidste slide der blev vist, så de ikke bliver stapplet ovenpå hinanden og så der kun bliver vist en ad gangen//
    }
    for (i = 0; i < dots.length; i++) { //Endnu et for loop som har med navigations prikkerne at gøre; Her sættes værdien igen til 0 før loopet executes, og derefter komer en condition på samme måde, hvis i er mindre end dots.length så executer den funktionen, og øger i værdien for hvert loop. //
        dots[i].className = dots[i].className.replace(" active", ""); //gør at når prikkerne skifter, ændres den fra at være " active" hvilket activere en backgroundcolor i css'en til at være tom esentielt. 
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Stort slideshow slut //