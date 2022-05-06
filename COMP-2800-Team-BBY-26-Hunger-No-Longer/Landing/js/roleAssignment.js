//1) Update and assign the role: "Individual"
const individualButton = document.querySelector("#signUpIndividual");
individualButton.addEventListener('click', (e) => {
    e.preventDefault();

    db.collection("users").doc(firebase.auth().currentUser.uid).update({
        role: "Individual"
    }).then((docRef) => {
        console.log("Updated!", docRef);
        window.location.replace("/Landing/landing2_indiv.html");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
});

//************************************************************************************/

//2) Update and assign the role: "Charity"
const charityButton = document.querySelector("#signUpCharity");
charityButton.addEventListener('click', (e) => {
    e.preventDefault();

    db.collection("users").doc(firebase.auth().currentUser.uid).update({
        role: "Charity"
    }).then((docRef) => {
        console.log("Updated!", docRef);
        window.location.replace("/Landing/landing2_charity.html");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
});

//************************************************************************************/

//3) Update and assign the role: "Business"
const businessButton = document.querySelector("#signUpBusinessOwner");
businessButton.addEventListener('click', (e) => {
    e.preventDefault();

    db.collection("users").doc(firebase.auth().currentUser.uid).update({
        role: "Business"
    }).then((docRef) => {
        console.log("Updated!", docRef);
        window.location.replace("/Landing/landing2_business.html");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
});
