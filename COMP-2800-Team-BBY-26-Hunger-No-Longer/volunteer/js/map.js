/** 
 * Checks if user is logged in.
 * only takes location of logged in users.
 * */
 $(document).ready(function () {
  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
          loggedInUser = user;
      } else {
          console.warn("No user detected!");
          window.location.replace = "index.html";
      }
  });
});
var map;
// Taken from stackoverflow credits goes to geocodezip 
// slightly modified for Vancouver location.
// need to add an alert as we need to alert Users of location recording*
// https://stackoverflow.com/questions/28813099/googlemap-how-to-add-and-delete-marker
function initialize() {
  // default Vancouver location
  var myCenter = new google.maps.LatLng(49.283832198, -123.119332856)
  var mapProp = {
      center: myCenter,
      zoom: 11,
      //mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  var marker = new google.maps.Marker({
      position: myCenter,
  });

  marker.setMap(map);

  // This event listener will call placeMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function (event) {
      placeMarker(event.latLng);
  });
}

// Want to use this to locate food for individual 
function placeMarker(location) {
  var marker = new google.maps.Marker({
      position: location, 
      map: map
  });
}

var x = document.getElementById("geo");
var latitude;
var longitude;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


var lats;
var lng;
function showPosition(position) {
  lng = position.coords.longitude;
  lats = position.coords.latitude;
  console.log(lats);
  console.log(lng);
}
// Write to Firebase Latitude & Longitude, 

function updatePosition() {
  var user = firebase.auth().currentUser;
  getLocation();
  var updatePosition = db.collection("users");
  updatePosition.doc(user.uid).set({
    latitude: lats,
    longitude: lng,
  }, {
      merge: true
  })
  .then(function () {
              setTimeout(function(){
                window.location.href = "map.html";}, 5000);
    })
  } 
