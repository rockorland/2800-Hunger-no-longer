function getRestaurants() {
    db.collection("BusinessNews").get().then(function (data) {
        var count = 0;
        data.forEach(function (doc) {
            console.log(doc);

            $("#postContainer").append(`
                    <div id="feed" style="display: grid;
                                    grid-template-rows: 30px 100px 35px auto auto auto auto; /*REVISE?*/
                                    background-color: white;
                                    height: 150px;
                                    border-radius: 50px;
                                    margin-left: 10px;
                                    margin-right: 10px;">
                        <div id="nameAndDateContainer" style="display: grid; grid-template-columns: 160px auto auto;">
                            <div id="userSpot" style="margin-top: 7px; padding-left: 35px;">${doc.data().BusName}</div>
                            <div id="dateSpot" style="margin-top: 7px;">Posted On: ${doc.data().PostDate}</div>
                        </div>
                        <div id="picAndTextContainer" style="display: grid; grid-template-columns: 100px auto;"> 
                            <div id="pictureSpot">
                                <div id="picture">
                                    <img src=${doc.data().Image} width="85px" height="85px" style="display: block; margin-left: 35px; margin-top: -5px; margin-right: auto;">
                                </div>
                            </div>
                            <div id="titleTextContainer" style="display: grid; grid-template-rows: 32px 50px; grid-template-columns: auto 120px;">
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
                                ${doc.data().BusName}
                                </div>
                                <div id="claim" style="height: 65px; 
                                                    background-color: rgb(67, 135, 212); /* For browsers that do not support gradients */
                                                    background-image: linear-gradient(to left, rgb(0, 143, 238) , rgb(0, 98, 190));
                                                    margin-right: 20px;
                                                    margin-top: 10px;
                                                    color: white;
                                                    text-align: center;
                                                    padding-top: 15px;
                                                    border-radius: 20px;">
                                    <span id="claimFont" style="font-size: 18pt;">CLAIM</span>
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
                                <p>Food Items: ${doc.data().Content}</p>
                                <p>Best Before:${doc.data().BestDate}</p>
                                </div>
                            </div>
                        </div>
                        <div id="likeLoveContainer" style="display: grid; grid-template-columns: 50px 50px 50px auto; margin-top: -15px;">
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
            `);
        }
    );
    });
}

// function closeContainer() {
//     $( "#actualFoodButton" ).click(function() {
//         $( "#postContainer" ).hide( "slow", function() {
//           // Animation complete.
//         });
//     });
//     console.log("hi");
// };