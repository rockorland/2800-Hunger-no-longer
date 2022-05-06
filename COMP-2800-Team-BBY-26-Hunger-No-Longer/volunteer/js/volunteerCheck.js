function checkVolunteer() {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;

        db.collection("users").doc(user.uid).get().then(function (doc) {
            if(doc.data().volunteer) {
                $('#myModalLoading').modal('show');
                setTimeout(function() {
                    window.location.href = "/volunteer/map.html"}, 2000);
                } else if(doc.data().role == "Business" || doc.data().role == "Charity") {
                    revokeAccess();
                    } else if (doc.data().role = "Individual" || doc.data().volunteer == null) {
                        $('#myModalLoading').modal('show');
                        setTimeout(function() {
                            window.location.href = "/volunteer/volunteer.html"}, 2000);
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