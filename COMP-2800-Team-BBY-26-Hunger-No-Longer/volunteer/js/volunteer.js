/** 
 * Checks if user is logged in.
 * 
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


// Select all checkboxes with the name 'days' using querySelectorAll.
var checkboxes = document.querySelectorAll("input[type=checkbox][name=days]");
//var checkboxesForTime = document.querySelectorAll("input[type=checkbox][name=time]");
let availableDays = []
let availableTime = []

// Use Array.forEach to add an event listener to each checkbox.
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    availableDays = 
      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
      
    availableDays = availableDays.toString();
    //console.log(availableDays)
  })
});
// Checkbox for Time
/* checkboxesForTime.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      availableTime = 
        Array.from(checkboxesForTime) // Convert checkboxes to an array to use filter and map.
        .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
        .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
        
    
      console.log(availableTime.toString());
    })
  }); */
/**
 * Updates user to assume role of Volunteer.
 * 
 * @param address address of volunteer
 * @param city city of volunteer
 * @param prov prov of volunteer
 * @param number phone number of volunteer
 */
 function updateVolunteer(address,city,prov,number,availableDays) {
    var updateVolunteer = db.collection("volunteer");
    var user = firebase.auth().currentUser;

    updateVolunteer.doc(user.uid).set({
        userDisplayName: user.displayName,
        userEmail: user.email,
        updateAddress: address,
        updateCity: city,
        updateProv: prov,
        updateNumber: number,
        availDay: availableDays,
        date: Date.now(),
        UID: user.uid,
    }, {
        merge: true
    })
    .then(function () {
      
      //Added a flag to mark an individual as a Volunteer:
        db.collection('users').doc(user.uid).set({
          volunteer: true},{
              merge: true
              }).then(() => {
                setTimeout(function(){
                  window.location.href = "volunteer-confirm.html";}, 3000);
              })
    });
}

/**
 * Retrieves user input and updates volunteer profile.
 */
function getInfo() {
    document.getElementById("button-sub").addEventListener('click', function () {
        var updateAddress = document.getElementById("address-input").value;
        var updateCity = document.getElementById("city-input").value;
        var updateProv = document.getElementById("province-input").value;
        var updateNumber = document.getElementById("number-input").value;
        var availDay = availableDays;

        if (updateAddress, updateCity, updateProv != "") {
          $('#myModalThankYou').modal('show');
          updateVolunteer(updateAddress, updateCity, updateProv, updateNumber, availDay);
        }
        else {
          $('#myModalBlankForm').modal('show');
        return false;
        }
    });
}
getInfo();



/**  
 * Only accepts numbers in the form.
 * @param textbox input for text form.
 * @param inputFilter prevents user from inputting anything else besides numbers.
 */
 function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
      textbox.addEventListener(event, function () {
          if (inputFilter(this.value)) {
              this.oldValue = this.value;
              this.oldSelectionStart = this.selectionStart;
              this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
              this.value = this.oldValue;
              this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          } else {
              this.value = "";
          }
      });
  });
}


/**  
* points to phoneNumber in Volunteer.html.
* prevents anything besides numbers.
*/
setInputFilter(document.getElementById("number-input"), function (value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

function closeModal() {
  $('#myModalBlankForm').modal('hide')
}

