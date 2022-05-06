//1) CLIENT: SAVE USER INPUT INTO SERVER + SAVE TO DATABASE
const editForm = document.querySelector('#userInputForm');
editForm.addEventListener('submit', (e) => {
    e.preventDefault(); //This function will prevent the page from refreshing upon user hitting ENTER KEY upon input.
    
    db.collection("users").doc(firebase.auth().currentUser.uid).update({
        username: editForm['usernameBox'].value,
        email: editForm['emailBox'].value,
        bio: editForm['userBioBox'].value,
    }).then((docRef) => {
        console.log("This is the docRef: " + docRef);
        console.log("Changes sucessful!");
        alert("Changes Sucessful! Returning you to My Account Overview...");
        setTimeout(function(){
            window.location.replace("/myAccount/myAccount_individual.html");
         }, 2000); //setTimeout to allow "buffer" time for functions above to complete.
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
});