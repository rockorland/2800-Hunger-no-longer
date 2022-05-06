'use strict'
//const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e) => {
//     e.preventDefault();
//     firebase.auth().signOut().then (function () {
//         console.log("user had signed out")
//         window.location.href = "index.html";
//     })
//     .catch(function (error) {
//         // An error happened
//     });
// })

$(function() {
    $('#sideLogOut').on('click', () => {
        logOut();
    })
})

// Logout function
function logOut() {
    firebase.auth().signOut()
        .then(function() {
            window.location.href = "/index.html";
        })
        .catch(function(error) {
            // An error happened
        });
}