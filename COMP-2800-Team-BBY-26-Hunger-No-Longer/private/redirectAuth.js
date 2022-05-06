//For Existing Users: THIS CHECKS IF USER IS LOGGED IN OR NOT.
auth.onAuthStateChanged(user => {
    if(user) {
        //Do nothing
    } else {
        console.log("You are not logged in!") //Kicks them back out.
        window.location.href = "/index.html"; //REDIRECTS THEM AFTER LOGGING IN TO SPECIFIED PAGE (please change to home.html)
    }
})




