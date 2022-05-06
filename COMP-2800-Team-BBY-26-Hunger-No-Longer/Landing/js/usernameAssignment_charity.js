const usernameInputForm = document.querySelector('#usernameForm');
usernameInputForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection("users").doc(firebase.auth().currentUser.uid).update({
        username: usernameInputForm['usernameBox'].value
    }).then((docRef) => {
        console.log("Updated!", docRef);
        window.location.replace("/Landing/landing3_charity.html");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
});
