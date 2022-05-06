function detectPost() {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        db.collection("Post").where("UID", "==", user.uid).onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                if(doc.exists) {
                    $("#noPostTextContainer").css({"display": "none"});

                    //***IF no picture has been uploaded: */
                    var picture;
                    if(doc.data().pictureURL == null) {
                        picture = "https://firebasestorage.googleapis.com/v0/b/hunger-no-longer.appspot.com/o/posts%2FdjR9UC8ZHDRvrKfiaf0aq4ZL46b2.jpg?alt=media&token=93b46c50-bf33-4334-b08c-811ec8f6468a";
                    } else {
                        picture = doc.data().pictureURL;
                    }

                    $("#postFeedContainer").append(`
                        <div id="${doc.id}">
                            <div id="feed" style="display: grid;
                                            grid-template-rows: 30px 100px 35px auto auto auto; /*REVISE?*/
                                            border: 1px solid rgb(107, 107, 107);
                                            background-color: white;
                                            height: 150px;
                                            border-radius: 50px;
                                            margin-left: 10px;
                                            margin-right: 10px;">
                                <div id="nameAndDateContainer" style="display: grid; grid-template-columns: 137px auto auto;">
                                    <div id="userSpot" style="margin-top: 7px; padding-left: 35px;">${doc.data().username}</div>
                                    <div id="dateSpot" style="margin-top: 7px;">${doc.data().date}</div>
                                </div>
                                <div id="picAndTextContainer" style="display: grid; grid-template-columns: 100px auto;"> 
                                    <div id="pictureSpot">
                                        <div id="picture">
                                            <img src=${picture} width="85px" height="85px" style="display: block; margin-left: auto; margin-right: auto; padding-top: 10px;">
                                        </div>
                                    </div>
                                    <div id="titleTextContainer" style="display: grid; grid-template-rows: 32px 50px;">
                                        <div id="titleSpot" style="font-size: 16px; font-family:Georgia, 'Times New Roman', Times, serif; 
                                                                    font-weight: 900; 
                                                                    color: black;
                                                                    padding-left: 35px;
                                                                    padding-right: 20px;
                                                                    overflow: auto; 
                                                                    overflow-x: hidden; 
                                                                    text-overflow: ellipsis; 
                                                                    -ms-overflow-style: none; 
                                                                    scrollbar-width: none; 
                                                                    height: 20px;">
                                            ${doc.data().title}
                                        </div>
                                        <div id="textBodySpot" style="overflow: auto; 
                                                                overflow-x: hidden; 
                                                                -ms-overflow-style: none; 
                                                                scrollbar-width: none; 
                                                                height: 58px;
                                                                margin-top: -7px;
                                                                padding-left: 35px;
                                                                text-overflow: ellipsis; 
                                                                padding-right: 20px;">
                                            ${doc.data().body}
                                        </div>
                                    </div>
                                </div>
                                <div id="likeLoveContainer" style="display: grid; grid-template-columns: 50px 50px 50px auto; margin-top: -10px;">
                                    <div id="heart" style="padding-top: 3px; padding-left: 35px;">
                                        <a href=""><img src="https://img.icons8.com/color/25/000000/like--v3.png"/></a>
                                    </div>
                                    <div id="smile" style="padding-top: 3px; padding-left: 30px;">
                                        <a href=""><img src="https://img.icons8.com/material-outlined/25/000000/happy--v2.png"/></a>
                                    </div>
                                    <div id="notSmile" style="padding-top: 5px; padding-left: 25px;">
                                        <a href=""><img src="https://img.icons8.com/android/21/000000/sad.png"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                    uniquePostAnchor(doc.id);
                } else {
                    console.log("No Posts Here!");
                }
            });
        });
    }
)}; 
detectPost();

//Function To Give Each Post a Unique URL Anchor:
function uniquePostAnchor(docID) {
    document.getElementById(docID).addEventListener("click", function () {
        window.location.href = "/Forum/Thread.html?id=" + docID;
      });
};