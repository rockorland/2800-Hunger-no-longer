/**
 * Display user name and profile pic
 */

function getUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection('users')
                .doc(user.uid)
                .get()
                .then(doc => {
                    $('#profileName>P').text(`${doc.data().username}`);
                    $('#profilePic').attr('src', `${doc.data().pictureURL}`);
                    $('#profileEmail>P').text(`${doc.data().email}`);

                })
        } else {
            // User is signed out.
        }
    })
}
getUserInfo();