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

const   body = document.querySelector("body"),
        nav = document.querySelector("nav"),
        sidebarOpen = document.querySelector(".sidebarOpen"),
        sidebarClose = document.querySelector(".sidebarClose");
        

// Js code to toggle sidebar
        sidebarOpen.addEventListener("click" , () =>{
                nav.classList.add("active");
        });

        body.addEventListener("click" , e =>{
            let clickedElm = e.target;
            
            if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu"))
                nav.classList.remove("active"); 
        });


        var style = document.createElement('style');

// Filter funktion
style.setAttribute("id","multiselect_dropdown_styles");
document.head.appendChild(style);

function MultiselectDropdown(options){
  var config={
    search:true,
    height:'205px',
    placeholder:'Afdelinger',
    txtSelected:'selected',
    txtAll:'All',
    txtRemove: 'Remove',
    txtSearch:'search',
    ...options
  };
  function newEl(tag,attrs){
    var e=document.createElement(tag);
    if(attrs!==undefined) Object.keys(attrs).forEach(k=>{
      if(k==='class') { Array.isArray(attrs[k]) ? attrs[k].forEach(o=>o!==''?e.classList.add(o):0) : (attrs[k]!==''?e.classList.add(attrs[k]):0)}
      else if(k==='style'){  
        Object.keys(attrs[k]).forEach(ks=>{
          e.style[ks]=attrs[k][ks];
        });
       }
      else if(k==='text'){attrs[k]===''?e.innerHTML='&nbsp;':e.innerText=attrs[k]}
      else e[k]=attrs[k];
    });
    return e;
  }

  
  document.querySelectorAll("select[multiple]").forEach((el,k)=>{
    
    var div=newEl('div',{class:'multiselect-dropdown',style:{width:config.style?.width??el.clientWidth+'px',padding:config.style?.padding??''}});
    el.style.display='none';
    el.parentNode.insertBefore(div,el.nextSibling);
    var listWrap=newEl('div',{class:'multiselect-dropdown-list-wrapper'});
    var list=newEl('div',{class:'multiselect-dropdown-list',style:{height:config.height}});
    var search=newEl('input',{class:['multiselect-dropdown-search'].concat([config.searchInput?.class??'form-control']),style:{width:'100%',display:el.attributes['multiselect-search']?.value==='true'?'block':'none'},placeholder:config.txtSearch});
    listWrap.appendChild(search);
    div.appendChild(listWrap);
    listWrap.appendChild(list);

    el.loadOptions=()=>{
      list.innerHTML='';
      
      if(el.attributes['multiselect-select-all']?.value=='true'){
        var op=newEl('div',{class:'multiselect-dropdown-all-selector'})
        var ic=newEl('input',{type:'checkbox'});
        op.appendChild(ic);
        op.appendChild(newEl('label',{text:config.txtAll}));
  
        op.addEventListener('click',()=>{
          op.classList.toggle('checked');
          op.querySelector("input").checked=!op.querySelector("input").checked;
          
          var ch=op.querySelector("input").checked;
          list.querySelectorAll(":scope > div:not(.multiselect-dropdown-all-selector)")
            .forEach(i=>{if(i.style.display!=='none'){i.querySelector("input").checked=ch; i.optEl.selected=ch}});
  
          el.dispatchEvent(new Event('change'));
        });
        ic.addEventListener('click',(ev)=>{
          ic.checked=!ic.checked;
        });
  
        list.appendChild(op);
      }

      Array.from(el.options).map(o=>{
        var op=newEl('div',{class:o.selected?'checked':'',optEl:o})
        var ic=newEl('input',{type:'checkbox',checked:o.selected});
        op.appendChild(ic);
        op.appendChild(newEl('label',{text:o.text}));

        op.addEventListener('click',()=>{
          op.classList.toggle('checked');
          op.querySelector("input").checked=!op.querySelector("input").checked;
          op.optEl.selected=!!!op.optEl.selected;
          el.dispatchEvent(new Event('change'));
        });
        ic.addEventListener('click',(ev)=>{
          ic.checked=!ic.checked;
        });
        o.listitemEl=op;
        list.appendChild(op);
      });
      div.listEl=listWrap;

      div.refresh=()=>{
        div.querySelectorAll('span.optext, span.placeholder').forEach(t=>div.removeChild(t));
        var sels=Array.from(el.selectedOptions);
        if(sels.length>(el.attributes['multiselect-max-items']?.value??5)){
          div.appendChild(newEl('span',{class:['optext','maxselected'],text:sels.length+' '+config.txtSelected}));          
        }
        else{
          sels.map(x=>{
            var c=newEl('span',{class:'optext',text:x.text, srcOption: x});
            if((el.attributes['multiselect-hide-x']?.value !== 'true'))
              c.appendChild(newEl('span',{class:'optdel',text:'🗙',title:config.txtRemove, onclick:(ev)=>{c.srcOption.listitemEl.dispatchEvent(new Event('click'));div.refresh();ev.stopPropagation();}}));

            div.appendChild(c);
          });
        }
        if(0==el.selectedOptions.length) div.appendChild(newEl('span',{class:'placeholder',text:el.attributes['placeholder']?.value??config.placeholder}));
      };
      div.refresh();
    }
    el.loadOptions();
    
    search.addEventListener('input',()=>{
      list.querySelectorAll(":scope div:not(.multiselect-dropdown-all-selector)").forEach(d=>{
        var txt=d.querySelector("label").innerText.toUpperCase();
        d.style.display=txt.includes(search.value.toUpperCase())?'block':'none';
      });
    });

    div.addEventListener('click',()=>{
      div.listEl.style.display='block';
      search.focus();
      search.select();
    });
    
    document.addEventListener('click', function(event) {
      if (!div.contains(event.target)) {
        listWrap.style.display='none';
        div.refresh();
      }
    });    
  });
}

window.addEventListener('load',()=>{
  MultiselectDropdown(window.MultiselectDropdownOptions);
});

/*start Calender*/


"use strict";

// function that creates dummy data for demonstration
function createDummyData() {
  var date = new Date();
  var data = {};

  for (var i = 0; i < 10; i++) {
    data[date.getFullYear() + i] = {};

    for (var j = 0; j < 12; j++) {
      data[date.getFullYear() + i][j + 1] = {};

      for (var k = 0; k < Math.ceil(Math.random() * 10); k++) {
        var l = Math.ceil(Math.random() * 28);

        try {
          data[date.getFullYear() + i][j + 1][l].push({
            startTime: "13:00",
            endTime: "18:00",
            text: "Skak-Klub møde"
          });
        } catch (e) {
          data[date.getFullYear() + i][j + 1][l] = [];
          data[date.getFullYear() + i][j + 1][l].push({
            startTime: "13:00",
            endTime: "18:00",
            text: "Brætspilsdag"
          });
        }
      }
    }
  }

  return data;
}

// creating the dummy static data
var data = createDummyData();

// initializing a new calendar object, that will use an html container to create itself
var calendar = new Calendar(
  "calendarContainer", // id of html container for calendar
  "medium", // size of calendar, can be small | medium | large
  [
    "Wednesday", // left most day of calendar labels
    3 // maximum length of the calendar labels
  ],
  [
    "#47B9B3", // primary color
    "#00454E", // primary dark color
    "#E4F1F0", // text color
    "#FBE355", // text dark color
  ]
);

// initializing a new organizer object, that will use an html container to create itself
var organizer = new Organizer(
  "organizerContainer", // id of html container for calendar
  calendar, // defining the calendar that the organizer is related to
  data // giving the organizer the static data that should be displayed
);

