//1) Fetches Current User Information:
function getUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        if(user) {
            uid = user.uid;
            console.log(uid); //Test if it works
            db.collection('users').doc(uid).get()
                .then((doc) => {
                    applyFetchedProfileData(doc.data());
            })
        }
    })
};
getUserInfo();

const profileContainer = document.querySelector('#profileBackground');
const profileCard = document.querySelector('#profileContainer');

//2) Applies the fetched data and translates selected data into DOM elements
function applyFetchedProfileData(data) {
    let html = ''; //Stringifies each DOM element placed in this array.
    let html2 = '';

        const profileData = data;
        if (profileData.bio == null) {
            profileData.bio = "Nobody knows what you do, your interests or hobbies. <br> Let others know about you by editing your profile."
        }

        const DOMelements = `
        <div id="profileBackground" 
            style="background-image: url(${profileData.pictureURL}); 
            background-size: cover; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            display: grid;
            background-position: center; 
            grid-template-rows: auto;"> 
            <div id="profile">
                <div></div>
                <div id="profilePicContainer">
                    <img id="profilePic" src=${profileData.pictureURL} width="100px" height="100px">
                </div>
                <div id="profileName">
                    <p><b>${profileData.name}</b></p>
                </div>
                <div id="profileEmail">
                    <p>${profileData.email}</p>
                </div>
            </div>
        </div>
        `;
        html += DOMelements
        
        const DOMelements2 = `
        <div class="avatar">
            <img src=${profileData.pictureURL} width="100px" height="100px">
        </div>
        <div class="info">
            <div class="title">
                <span id="nameTitleSpot"><b>${profileData.name}</b></span>
                <br>
                <span id="usernameSpot">@${profileData.username}</span>
            </div>
            <div class="desc">${profileData.bio}</div>
        </div>
        `;
        html2 += DOMelements2
    
    //APPLYING OF DATA CONTENTS TO DOM ELEMENTS:
    profileContainer.innerHTML = html;
    profileCard.innerHTML = html2;
}
