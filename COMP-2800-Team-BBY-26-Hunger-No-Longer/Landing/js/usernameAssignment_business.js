const usernameInputForm = document.querySelector('#submitButton');
usernameInputForm.addEventListener('click', (e) => {
    e.preventDefault();

    db.collection("users").doc(firebase.auth().currentUser.uid).update({
            username: document.getElementById('usernameBox').value
        }).then((docRef) => {
            console.log("Updated!", docRef);
            window.location.assign("/Landing/landing3_business.html");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
});