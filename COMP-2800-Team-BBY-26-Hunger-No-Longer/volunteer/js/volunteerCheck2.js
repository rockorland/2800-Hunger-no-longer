function checkVolunteer() {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;

        db.collection("users").doc(user.uid).get().then(function (doc) {
            if(doc.data().role == "Business" || doc.data().role == "Charity" || doc.data().volunteer == true) {
                revokeAccess();
            } 
        })
    }); 
};
checkVolunteer();

function revokeAccess() {
    $('#myModalRevokeAccess').modal('show');
    setTimeout(function() {
        window.location.href = "/Guang_Yang_busiOwner/html/BusNews.html";}, 2000);
}