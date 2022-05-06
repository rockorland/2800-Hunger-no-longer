//1) IF USER CHOOSES NO PROFILE PIC (DEFAULT IS GIVEN):
const optionalButton = document.querySelector('#optionalButton');
optionalButton.addEventListener('click', (e) => {
    e.preventDefault(); //This function will prevent the page from refreshing upon user hitting ENTER KEY upon input.

    //Upload to database (User Collection)
    db.collection("users").doc(firebase.auth().currentUser.uid).update({
        pictureURL: "https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2017/11/04133712/waterfall.jpg"
    }).then((docRef) => {
        console.log("Updated!", docRef);
        window.location.replace("/Forum/Forum.html");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
});

//2) IF USER DECIDES TO UPLOAD ONE
/**  
 * when User is logged in, listens for file upload
 * @param user uploads user custom photo for profile picture.
 *
 */
 firebase.auth().onAuthStateChanged(function (user) {
    user = firebase.auth().currentUser;
    if (user != null) {
        // User is signed in.
        user.providerData.forEach(function () {});

        function uploadUserProfilePic() {
            // Let's assume my storage is only enabled for authenticated users 
            // This is set in your firebase console storage "rules" tab
            firebase.auth().onAuthStateChanged(function (user) {
                var fileInput = document.getElementById("pictureButton"); // pointer #1
                const image = document.getElementById("userImage"); // pointer #2
                // listen for file selection
                fileInput.addEventListener('change', function (e) {
                    var file = e.target.files[0];
                    var blob = URL.createObjectURL(file);
                    image.style.display = "initial";
                    image.src = blob; // display this image
                    //store using this name
                    var storageRef = storage.ref("images/" + user.uid + ".jpg");
                    //upload the picked file
                    storageRef.put(file)
                        .then(function () {
                            console.log('Uploaded to Cloud Storage.');
                            alert("Upload Image Sucessful!");
                        })
                    //get the URL of stored file
                    storageRef.getDownloadURL()
                        .then(function (url) { // Get URL of the uploaded file
                            console.log(url); // Save the URL into users collection
                            db.collection("users").doc(user.uid).update({ //.update NOT .set
                                    "pictureURL": url
                                }, {
                                    merge: true
                                })
                                .then(function () {
                                    window.location.replace("/Guang_Yang_busiOwner/html/BusNews.html");
                                })
                        })
                })
            })
        }
        uploadUserProfilePic();    
    } else {
        // No user is signed in.
        console.warn("User is not logged in")
    }
})



