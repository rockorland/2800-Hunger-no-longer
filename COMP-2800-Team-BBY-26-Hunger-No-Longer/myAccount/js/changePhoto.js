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
                                    alert("Picture Sucessfully Changed!");
                                    setTimeout(function() { 
                                        window.location.replace("/myAccount/myAccount_individual.html");}, 3000);
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

