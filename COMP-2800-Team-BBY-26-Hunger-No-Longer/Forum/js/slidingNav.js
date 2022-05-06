'use strict'

//When you invoke this method, it will set a width to reveal side bar:
function openNav() {
    event.stopPropagation();
    document.getElementById("mySidenavContainer").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.7)";
  }
  
//When you invoke this method, it will set a width=0 to close side bar:
function closeNav() {
    //Never use .onclick, but rather .addEventListener
    document.querySelector('#outerContainer').addEventListener('click', closeNav);
    document.getElementById("mySidenavContainer").style.width = "0";
    document.body.style.backgroundColor = "white";
}

