//INITIAL SETUP: to update to same collection document:
var ref = db.collection("my_collection").doc();
var myId = ref.id;

//Initial SETUP 2: creating a function to get username attribute of the current user:
var uid;
var username;

function getUsername() {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        if(user) {
            uid = user.uid;
            console.log(uid); //Test if it works
            db.collection('users').doc(uid).get()
                .then(function(doc) {
                    console.log(doc.data().username);
                    updateUsernameToPost(doc.data().username);
            })
        } else {
            console.log("Error in fetching user data!")
        }
    })
};

function updateUsernameToPost(usernameInput) {
    db.collection('Post').doc(myId).set({
        username: usernameInput},{
            merge: true
            }).then(() => {
                console.log("Post sucessful!");
            })
};

//1) USER INPUT FOR POSTS
const postForm = document.querySelector('#createAPostForm');
postForm.addEventListener('submit', (e) => {
    e.preventDefault(); //This function will prevent the page from refreshing upon user hitting ENTER KEY upon input.
    getUsername(); //Local invocation to assign username upon SUBMIT
    
    db.collection('Post').doc(myId).set({
        UID: firebase.auth().currentUser.uid,
        title: postForm['titleBox'].value,
        body: postForm['textBody'].value,
        tag: postForm['tagBox'].value,
        date: new Date().toISOString().slice(0, 10)},{ //Source from https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
            merge: true
            }).then(() => {
                console.log("Post sucessful!");
                alert("Post Sucessful! Returning to Social Hub.");
                setTimeout(function(){
                    window.location.replace("/Forum/Forum.html");
                 }, 2000); //setTimeout to allow "buffer" time for functions above to complete.
            })
});

//2) IF USER WANTS TO UPLOAD IMAGE WITH IT
        function uploadUserProfilePic() {
            // Let's assume my storage is only enabled for authenticated users 
            // This is set in your firebase console storage "rules" tab
                var fileInput = document.getElementById("pictureButton"); // pointer #1
                const image = document.getElementById("userImage"); // pointer #2
                // listen for file selection
                fileInput.addEventListener('change', function (e) {
                    var file = e.target.files[0];
                    var blob = URL.createObjectURL(file);
                    //store using this name
                    var storageRef = storage.ref("Post/" + myId + ".jpg");
                    $('#myModalUploadImageWait').modal('show');
                    //upload the picked file
                    storageRef.put(file)
                        .then(function () {
                            $('#myModalUploadImageWait').modal('hide');
                            $('#myModalUploadImageSucessful').modal('show');
                            //get the URL of stored file
                            storageRef.getDownloadURL()
                                .then(function (url) { 
                                const postForm = document.querySelector('#createAPostForm');
                                postForm.addEventListener('submit', (e) => {
                                    e.preventDefault(); //This function will prevent the page from refreshing upon user hitting ENTER KEY upon input.
                                    getUsername(); //Local invocation to assign username upon SUBMIT
                                    
                                    db.collection('Post').doc(myId).set({
                                        UID: firebase.auth().currentUser.uid,
                                        title: postForm['titleBox'].value,
                                        body: postForm['textBody'].value,
                                        tag: postForm['tagBox'].value,
                                        "pictureURL": url,
                                        date: new Date().toISOString().slice(0, 10)},{ //Source from https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
                                            merge: true
                                            }).then(() => {
                                                // alert("Picture Sucessfully Uploaded!");
                                            })
                                });
                            })
                        })
                })
        }

    



