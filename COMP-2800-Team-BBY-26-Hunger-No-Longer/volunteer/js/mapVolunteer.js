/** 
 * Checks if user is logged in.
 * only takes location of logged in users.
 * */
var uid;
$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            loggedInUser = user;

        } else {
            console.warn("No user detected!");
            window.location.replace = "index.html";
        }
    });
});

// let map, infoWindow;

var center = {
    lat: 49.2516,
    lng: -123.0014
};
// Map options
var options = {
    center: center,
    zoom: 11,
}

// New map
var map = new google.maps.Map(document.getElementById('googleMap'), options);

// Create a button to locate the users
infoWindow = new google.maps.InfoWindow();
const locationButton = document.createElement("button");
locationButton.setAttribute('id', 'locationB');
locationButton.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
locationButton.classList.add("custom-map-control-button");

map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
// Click to locate users
locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
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
// Listen for click on 'get food for me@ button to show all the restaurants
function updatePosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("You are here.");
                infoWindow.open(map);
                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    var user = firebase.auth().currentUser;
    getLocation();
    var updatePosition = db.collection("users");
    updatePosition.doc(user.uid).set({
        latitude: lats,
        longitude: lng,
    }, {
        merge: true
    })
    let markerArray = [];
    db.collection('Business')
        .get()
        .then((snap) => {
            snap.forEach(doc => {

                console.log(doc.data().longitude + " " + doc.data().latitude);
                let location = {};
                location.lat = doc.data().latitude;
                location.lng = doc.data().longitude;
                let content = `<h2>${doc.data().bName}</h2><p>${doc.data().bLocation}` + " " + `${doc.data().bZip}</p>`
                let objGeo = {};
                objGeo.location = location;
                objGeo.content = content;
                markerArray.push(objGeo);
                console.log(markerArray);
                for (let i = 0; i < markerArray.length; i++) {
                    addMarker(markerArray[i]);
                }
            })
        })
}


// Add Marker
function addMarker(property) {
    const marker = new google.maps.Marker({
        position: property.location,
        map: map,

    });

    if (property.content) {
        const detailWin = new google.maps.InfoWindow({
            content: property.content
        })
        marker.addListener('click', () => {
            detailWin.open(map, marker);
        })
    }

}

/* This distance calculatin feature was copied from 
https://www.youtube.com/watch?v=BkGtNBrOhKU&list=PLWnON6N0wn-EwVx4ZJNbmvC6quBgq5cif&index=4 
 */
// Create a Direction service to use the route method and get the result for the request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionRenderer object to display the routes
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the directionRenderer to the map
directionsDisplay.setMap(map);

// Calculate the distance
function calcRoute() {
    // create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // pass the request to the route method
    directionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
            //get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From:" + document.getElementById("from").value +
                " .<br>To:" + document.getElementById('to').value + ".<br/>Walking Distance<i class='fas fa-road'></i>" +
                result.routes[0].legs[0].distance.text + ".<br/> Duration <i class = 'fas fa-hourglass-start'></i> : " +
                result.routes[0].legs[0].duration.text + ".</div>";

            // display route
            directionsDisplay.setDirections(result);

        } else {
            //delete route from map
            directionsDisplay.setDirections({
                routes: []
            });

            // center map in bcit burnaby
            map.setCenter(center);

            // show erroe message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'>" +
                "</i > could not retrieve the distance.</div > ";

        }
    });

}
//create autocomplete objects for all inputs
var options = {
    types: ['(postal_code)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);