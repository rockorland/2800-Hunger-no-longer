/** 
 * Checks if user is logged in.
 * 
 * */
$(document).ready(function() {
    /* firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            loggedInUser = user;
        } else {
            console.warn("No user detected!");
            window.location.href = "../../index.html";
        }
    }); */


    /**
     * Reset the form 
     */
    $('#reset').click(() => {
        $('form')[0].reset();
    })

    /**
     * Register business.
     * 
     * @param busName name of business
     * @param address address of business
     * @param phone phone number of business
     * @param city city of business
     * @param state prov of business
     * @param zip post code of business
     * 
     */
    function updateBusiness(busName, busPhone, address, city, state, zip, lat, lng) {
        var updateBusiness = db.collection("Business");

        var user = firebase.auth().currentUser;
        if (busName === null || address === null || busPhone === null) {
            alert('Please fill all the required information')

        } else {
            updateBusiness.add({
                UID: user.uid,
                bName: busName,
                bLocation: address,
                bphoneNo: busPhone,
                bState: state,
                bCity: city,
                bZip: zip,
                latitude: lat,
                longitude: lng
            }).then(function() {
                window.location.href = './BusRegisFeedBack.html';
            });
        }

    }

    /**
     * Retrieves business form input and updates business profile.
     */
    var latitude;
    var longitude;
    var busName;
    var busPhone;
    var address;
    var city;
    var state;
    var zip

    function getInfo() {
        $("#submit").click(function() {
            busName = $("#busname").val();
            busPhone = $("#phone").val();
            address = $("#inputAddress").val() + " " + $("#inputAddress2").val();
            console.log(address);
            city = $("#inputCity").val();
            state = $("#inputState").val();
            zip = $("#inputZip").val();
            if (!busName) {
                $("#busname").fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
            } else if (!busPhone) {
                $("#phone").fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
            } else {
                getCoordinates(address)
            }


        });
    }
    getInfo();

    // get business geolcoation data from the address users typed in
    function getCoordinates(addre) {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + addre + '&key=' + 'AIzaSyC9gRYsFCstlBzL6rd1Sykt5ZeJ2iuK2Yg')
            .then(response => response.json())
            .then(data => {
                if (data.status != 'OK') { // check if the input address is valid
                    alert('Cannot find the addresss');
                } else if (data.results[0].formatted_address.endsWith('USA')) { // check if the address if default(within usa)
                    alert('Please fill the address correctly');
                } else {
                    console.log(data);
                    latitude = data.results[0].geometry.location.lat;
                    longitude = data.results[0].geometry.location.lng;
                    console.log({
                        latitude,
                        longitude
                    })
                }
            }).then(() => {
                updateBusiness(busName, busPhone, address, city, state, zip, latitude, longitude);
            })

    }

});