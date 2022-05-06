//INITIAL SETUP: to update to same collection document:
var ref = db.collection("Comment").doc();
var myId = ref.id;
var uid;
var username;
const urlWithID = new URL(window.location.href);
var id = urlWithID.searchParams.get("id"); //UNIQUE doc id refering to the current Post clicked
console.log(id);

function getUsername() {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        if(user) {
            uid = user.uid;
            db.collection('users').doc(uid).get()
                .then(function(doc) {
                    console.log(doc.data().username);
                    console.log(uid); //Maybe Work???
                    console.log(doc.data().pictureURL);
                    updateUserInfoToComment(doc);
            })
        } else {
            console.log("Error in fetching user data!")
        }
    })
};

function updateUserInfoToComment(doc) {
    //***IF no picture has been uploaded: */
    var picture;
    if(doc.data().pictureURL == null) {
        picture = "https://firebasestorage.googleapis.com/v0/b/hunger-no-longer.appspot.com/o/posts%2FdjR9UC8ZHDRvrKfiaf0aq4ZL46b2.jpg?alt=media&token=93b46c50-bf33-4334-b08c-811ec8f6468a";
    } else {
        picture = doc.data().pictureURL;
    }

    db.collection('Comment').doc(myId).set({
        userName: doc.data().username,
        UID: firebase.auth().currentUser.uid,
        profilePictureURL: picture},{
            merge: true
            }).then(() => {
                console.log("Post sucessful!");
            })
};

// SUBMIT BUTTON: USER INPUT FOR COMMENTS
const commentForm = document.querySelector('#userCommentForm');
commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); //This function will prevent the page from refreshing upon user hitting ENTER KEY upon input.
    getUsername(); //Local invocation to assign username upon SUBMIT
    
    db.collection('Comment').doc(myId).set({
        body: commentForm['textBody'].value,
        postID: id,
        date: new Date().toISOString().slice(0, 10)},{ //Source from https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
            merge: true
            }).then(() => {
                console.log("Post sucessful!");
                alert("Post Sucessful!");
                setTimeout(function(){
                    window.location.href = "/Forum/Thread.html?id=" + id;
                 }, 1000); //setTimeout to allow "buffer" time for functions above to complete.
            })
});
