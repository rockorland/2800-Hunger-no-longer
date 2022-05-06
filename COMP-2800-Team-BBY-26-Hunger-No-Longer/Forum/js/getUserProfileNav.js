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

//2) Applies the fetched data and translates selected data into DOM elements
function applyFetchedProfileData(data) {
    let html = ''; //Stringifies each DOM element placed in this array.

        const profileData = data;
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
    profileContainer.innerHTML = html;
}
