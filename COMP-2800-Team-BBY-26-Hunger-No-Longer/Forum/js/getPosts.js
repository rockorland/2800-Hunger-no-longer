function getUserPosts() {
    db.collection("Post").get().then(function (data) {
        let html = ''; //Stringifies each DOM element placed in this array.
        
        data.forEach(function (doc) {

        //***IF no picture has been uploaded: */
        var picture;
        if(doc.data().pictureURL == null) {
            picture = "https://firebasestorage.googleapis.com/v0/b/hunger-no-longer.appspot.com/o/posts%2FdjR9UC8ZHDRvrKfiaf0aq4ZL46b2.jpg?alt=media&token=93b46c50-bf33-4334-b08c-811ec8f6468a";
        } else {
            picture = doc.data().pictureURL;
        }
  
          $("#feedContainer").append(`
            <div id="${doc.id}">
                <div id="feed" style="display: grid; grid-template-rows: 30px 100px 35px; border: 1px solid rgb(107, 107, 107);">
                    <div id="dateAndUserContainer" style="display: grid;grid-template-columns: 130px auto auto;">
                        <div id="userNamePosted" style="padding-left: 10px;">
                            <p>${doc.data().username}</p>
                        </div>
                        <div id="datePosted">
                            <p>${doc.data().date}</p>
                        </div>
                    </div>
                    <div id="pictureTitleTextContainer" style="display: grid; grid-template-columns: 0px 100px auto;">
                        <div></div>
                        <div id="picture">
                            <img src=${picture} width="80px" height="80px" style="display: block; margin-left: auto; margin-right: auto; padding-top: 10px;">
                        </div>
                        <div id="titleAndTextContainer" style="display: grid; grid-template-rows: 32px 50px;">
                            <div id="feedTitle" style="font-size: 15px; font-family:Georgia, 'Times New Roman', Times, serif; font-weight: 900; color: black;">
                                <p style="width: 100%;text-overflow: ellipsis; overflow: hidden; white-space: pre; margin-top: 7px;">${doc.data().title}</p>
                            </div>
                            <div id="textBody" style="overflow: auto; overflow-x: hidden; -ms-overflow-style: none; scrollbar-width: none; ">
                                <p>${doc.data().body}</p>
                            </div>
                        </div>
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
            </div>
        `);
          uniqueLinkAnchor(doc.id);
        });
    });
};

//Function To Give Each Post a Unique URL Anchor:
function uniqueLinkAnchor(docID) {
    document.getElementById(docID).addEventListener("click", function () {
        window.location.href = "/Forum/Thread.html?id=" + docID;
      });
};

setInterval(getUserPosts(), 3000);