$(document).ready(function () {
    const urlWithID = new URL(window.location.href);
    var id = urlWithID.searchParams.get("id"); //UNIQUE doc id refering to the current Post clicked

//1) Fetches Current User Post Information:
function getUserThread(id) {
    var docRef = db.collection("Post").doc(id);

    //Check if Post exists:
    docRef.get().then((doc) => {
        if (doc.exists) {
            firebase.auth().onAuthStateChanged(function (user) {
                user = firebase.auth().currentUser;
                if(user) {
                    db.collection("Post").doc(id).get().then(function (doc) {
                        applyFetchedPostData(doc, user);
                    })
                }
            });
        } else {
            alert("Post Does Not Exist! Redirecting you to Social Hub...");
            window.location.href = "/Forum/Forum.html";
        }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
}
setInterval(getUserThread(id), 3000);

//2) Function that fetches Post Data
function applyFetchedPostData(doc, user) {
    let html = ''; 

        //***IF no picture has been uploaded: */
        var picture;
        if(doc.data().pictureURL == null) {
            picture = "https://firebasestorage.googleapis.com/v0/b/hunger-no-longer.appspot.com/o/posts%2FdjR9UC8ZHDRvrKfiaf0aq4ZL46b2.jpg?alt=media&token=93b46c50-bf33-4334-b08c-811ec8f6468a";
        } else {
            picture = doc.data().pictureURL;
        }

        //Check if post belongs to current user
        if (doc.data().UID == user.uid) {
            $("#postContainer").prepend(`
                <div id="post">
                    <div id="dateAndUserContainer">
                        <div id="userNamePosted">
                            <p>${doc.data().username}</p>
                        </div>
                        <div id="datePosted">
                            <p>${doc.data().date}</p>
                        </div>
                    </div>
                    <div id="postTitle">
                        <p>${doc.data().title}</p>
                    </div>
                    <div id="postImage">
                        <img src=${picture}>
                    </div>
                    <div id="postBody">
                        <p>${doc.data().body}</p>
                    </div>
                    <div id="like-LoveContainer">
                        <div id="heart">
                            <a href=""><img src="https://img.icons8.com/color/25/000000/like--v3.png"/></a>
                        </div>
                        <div id="smile">
                            <a href=""><img src="https://img.icons8.com/material-outlined/25/000000/happy--v2.png"/></a>
                        </div>
                        <div id="notSmile">
                            <a href=""><img src="https://img.icons8.com/android/21/000000/sad.png"/></a>
                        </div>
                        <div class="deleteButtonUserPost" data-toggle="modal" data-target="#myModalDeletePost">
                            <span id="replyButtonFont">DELETE</span>
                        </div>
                    </div>                     
                </div>
                <!-- Delete Modal For Posts-->
                <div class="modal fade" id="myModalDeletePost" role="dialog">
                    <div class="modal-dialog">
                
                    <!-- Modal content-->
                    <div class="modal-content" keyboard="true">
                        <div class="modal-header">
                            <h4 class="modal-title2">Are You Sure You Want to Delete This Post?</h4>
                        </div>
                        <div class="modal-body2">
                            <p>This delete will be <b>permanent.</b></p>
                        </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-default" id=${doc.ref.id} style="display: block;
                                margin-left: auto;
                                margin-right: auto;
                                text-align: center;
                                background: #ED213A;  /* fallback for old browsers */
                                background: -webkit-linear-gradient(to right, #93291E, #ED213A);  /* Chrome 10-25, Safari 5.1-6 */
                                background: linear-gradient(to right, #93291E, #ED213A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */                                            
                                padding-top: 8px;
                                height: 55px;
                                border-radius: 20px; 
                                border: none;
                                width: 35%;
                                color: white;">DELETE</button>
                            </div> 
                        </div>
                    </div>
                </div>
            `);
            deletePost(doc.ref.id);
        } else {
            $("#postContainer").prepend(`
            <div id="post">
                <div id="dateAndUserContainer">
                    <div id="userNamePosted">
                        <p>${doc.data().username}</p>
                    </div>
                    <div id="datePosted">
                        <p>${doc.data().date}</p>
                    </div>
                </div>
                <div id="postTitle">
                    <p>${doc.data().title}</p>
                </div>
                <div id="postImage">
                    <img src=${picture}>
                </div>
                <div id="postBody">
                    <p>${doc.data().body}</p>
                </div>
                <div id="like-LoveContainer">
                    <div id="heart">
                        <a href=""><img src="https://img.icons8.com/color/25/000000/like--v3.png"/></a>
                    </div>
                    <div id="smile">
                        <a href=""><img src="https://img.icons8.com/material-outlined/25/000000/happy--v2.png"/></a>
                    </div>
                    <div id="notSmile">
                        <a href=""><img src="https://img.icons8.com/android/21/000000/sad.png"/></a>
                    </div>
                </div>                     
            </div>
        `);
        }
        $("#pageTitle").html(`${doc.data().title}`);

};

function deletePost(refId) {
    document.getElementById(refId + '')
        .addEventListener("click", function () {
            db.collection("Post").doc(refId).delete().then(() => {
                window.location.href = "/Forum/Forum.html";
            });
        });
};


});