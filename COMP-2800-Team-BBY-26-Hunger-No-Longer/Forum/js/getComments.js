const url = new URL(window.location.href);
var id = url.searchParams.get("id"); //UNIQUE doc id refering to the current Post clicked

const comContainer = document.querySelector('#commentContainer');

//1) Gets all user comments that ARENT the current users:
function getNonUserComments() {
    //Retrieves an array of Comments from the collection:
    db.collection("Comment").get().then(function (data) {
        
        //Gets All Comments Associated With Specific Post
        data.forEach(function (doc) {
            if(doc.data().postID == id && doc.data().UID != firebase.auth().currentUser.uid) {
                $("#commentContainer").append(`
                    <div id="comment">
                        <div id="dateAndUserContainer2">
                            <div id="userCommentPic">
                                <img src="${doc.data().profilePictureURL}" width="35px" height="35px">
                            </div>
                            <div id="userNamePosted2">
                                <p>${doc.data().userName}</p>
                            </div>
                            <div id="datePosted2">
                                <p>${doc.data().date}</p>
                            </div>
                        </div>
                        <div id="commentTextContainer">
                            <div></div>
                            ${doc.data().body}
                        </div>
                        <div id="like-replyContainer">
                            <div id="smile2">
                                <a href=""><img src="https://img.icons8.com/material-outlined/25/000000/happy--v2.png"/></a>
                            </div>
                            <div id="notSmile2">
                                <a href=""><img src="https://img.icons8.com/android/21/000000/sad.png"/></a>
                            </div>
                                <div class="replyButton">
                                    <span id="replyButtonFont">EDIT</span>
                                </div>
                                <div class="deleteButton">
                                    <span id="replyButtonFont">DELETE</span>
                                </div>
                        </div>       
                    </div>
                `);
            }
        });
    })
};
getNonUserComments();

//2) Gets all comments of current user
function detectComment() {
    var count = 0;
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        db.collection("Comment").where("postID", "==", id ).where("UID", "==", user.uid)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    $("#commentContainer").prepend(`
                        <div id="comment" style="background-color: rgba(78, 161, 255, 0.3);">
                            <div id="dateAndUserContainer2">
                                <div id="userCommentPic">
                                    <img src="${doc.data().profilePictureURL}" width="35px" height="35px">
                                </div>
                                <div id="userNamePosted2">
                                    <p>${doc.data().userName}</p>
                                </div>
                                <div id="datePosted2">
                                    <p>${doc.data().date}</p>
                                </div>
                            </div>
                            <div id="commentTextContainer">
                                <div></div>
                                ${doc.data().body}
                            </div>
                            <div id="like-replyContainer">
                                <div id="smile2">
                                    <a href=""><img src="https://img.icons8.com/material-outlined/25/000000/happy--v2.png"/></a>
                                </div>
                                <div id="notSmile2">
                                    <a href=""><img src="https://img.icons8.com/android/21/000000/sad.png"/></a>
                                </div>
                                    <div class="replyButton" style="display: initial;" data-toggle="modal" data-target="#myModalEdit${count}">
                                        <span id="replyButtonFont">EDIT</span>
                                    </div>
                                    <div class="deleteButton" style="display: initial;" data-toggle="modal" data-target="#myModalDelete${count}">
                                        <span id="replyButtonFont">DELETE</span>
                                    </div>
                            </div>       
                        </div>
                        <!-- Modal To Delete-->
                            <div class="modal fade" id="myModalDelete${count}" role="dialog">
                                <div class="modal-dialog">
                            
                                <!-- Modal content-->
                                <div class="modal-content" keyboard="true">
                                    <div class="modal-header">
                                        <h4 class="modal-title2">Are You Sure You Want to Delete This Comment?</h4>
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

                            <!-- Modal Form for Edit Comments -->
                            <form id="userCommentEditForm">
                                <div class="modal fade" id="myModalEdit${count}" role="dialog">
                                    <div class="modal-dialog">
                                    
                                        <!-- Modal content-->
                                        <div class="modal-content" keyboard="true">
                                                <div class="modal-header">
                                                    <h4 class="modal-titleEdit">Edit Comment</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <!-- Textarea Code from: https://codepen.io/zabielski/pen/gPPywv -->
                                                    <textarea name="the-textarea" type="text" id="textBody" maxlength="2000" placeholder="What Do You Want To Change..." autofocus required></textarea>
                                                    <div id="the-count">
                                                    <span id="current">0</span>
                                                    <span id="maximum">/ 2000</span>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-default" id="${doc.ref.id}-edit" style="display: block;
                                                    margin-left: auto;
                                                    margin-right: auto;
                                                    text-align: center;
                                                    background-color: rgb(48, 216, 132); /* For browsers that do not support gradients */
                                                    background-image: linear-gradient(to left, rgb(0, 250, 125) , rgb(43, 197, 125));
                                                    height: 55px;
                                                    margin-top: -6px;
                                                    border: none;
                                                    padding-top: 8px;
                                                    border-radius: 20px 20px 20px 20px; 
                                                    width: 35%;
                                                    color: white;">SUBMIT</button>
                                                </div> 
                                        </div>
                                    </div>
                                </div>
                            </form>
                    `);
                    count++;
                    deleteComment(doc.ref.id);
                    editComment(doc.ref.id);
                });
            })
    }
)};
detectComment();

function editComment(refId) {
    const inputEditForm = document.querySelector('#userCommentEditForm');
    inputEditForm.addEventListener('submit', (e) => {
        e.preventDefault(); //This function will prevent the page from refreshing upon user hitting ENTER KEY upon input.
        
        db.collection("Comment").doc(refId).update({
            body: inputEditForm['textBody'].value,
            date: new Date().toISOString().slice(0, 10) + "(edited)" //Source from https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
        }).then(() => {
            alert("Edit Successful!");
            window.location.href = window.location.href;
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    });
}

function deleteComment(refId) {
    document.getElementById(refId + '')
        .addEventListener("click", function () {
            db.collection("Comment").doc(refId).delete().then(() => {
                window.location.href = window.location.href;
            });
        });
};
