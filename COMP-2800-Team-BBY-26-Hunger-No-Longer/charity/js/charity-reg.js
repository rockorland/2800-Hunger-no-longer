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
     * @param cName name of business Charity
     * @param address address of business Charity
     * @param phone phone number of business Charity
     * @param city city of business Charity
     * @param state prov of business Charity
     * @param zip post code of business Charity
     * 
     */
    function updateBusiness(cName, cPhone, address, city, state, zip, lat, lng) {
        var updateBusiness = db.collection("Charity");

        var user = firebase.auth().currentUser;
        if (cName === null || address === null || cPhone === null) {
            alert('Please fill all the required information')

        } else {
            updateBusiness.add({
                UID: user.uid,
                cName: cName,
                cLocation: address,
                cphoneNo: cPhone,
                cState: state,
                cCity: city,
                bZip: zip,
                latitude: lat,
                longitude: lng
            }).then(function() {
                window.location.href = '../Guang_Yang_busiOwner/html/BusNews.html';
            });
        }

    }

    /**
     * Retrieves business form input and updates business profile.
     */
    var latitude;
    var longitude;
    var cName;
    var cPhone;
    var address;
    var city;
    var state;
    var zip

    function getInfo() {
        $("#submit").click(function() {
            cName = $("#busname").val();
            cPhone = $("#phone").val();
            address = $("#inputAddress").val() + " " + $("#inputAddress2").val();
            console.log(address);
            city = $("#inputCity").val();
            state = $("#inputState").val();
            zip = $("#inputZip").val();
            if (!cName) {
                $("#busname").fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
            } else if (!cPhone) {
                $("#phone").fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
            } else {
                getCoordinates(address);
            }
        });
    }
    getInfo();

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
                updateBusiness(cName, cPhone, address, city, state, zip, latitude, longitude);
            })

    }

});