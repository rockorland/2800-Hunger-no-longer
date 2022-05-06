function checkAccount() {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        db.collection("users").doc(user.uid).get().then(function (doc) {
            // console.log(doc.data().role); 
            if(doc.data().role == "Business" || doc.data().role == "Charity") {
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