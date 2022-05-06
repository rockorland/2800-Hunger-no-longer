// This file shows all available Volunteers for Charity & Business
/**  
 * Reads the database of scores
 * prints out table of the top 10 highest scores from highest to lowest with display name.
 */
 function volunteerQuery() {
    db.collection("volunteer")
        .where("date", ">", 1621503590496)
        .limit(100)
        .orderBy("date", "desc")
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var name = doc.data().userDisplayName;
                var email = doc.data().userEmail;
                var availableDays = doc.data().availDay;
                var div = document.getElementById('volunteerList');
                var tbl = document.createElement('table');
                //tbl.style.width = '100%';
                tbl.className = "table table-bordered ";
                for (var i = 0; i < 1; i++) {
                    var tr = tbl.insertRow();
                    var td = tr.insertCell();
                    td.className = "name-col";
                    var tk = tr.insertCell();
                    tk.className = "email-col";
                    var tav = tr.insertCell();
                    tk.className = "avail-col";

                }
                for (var k = 0; k < 1; k++) {
                    if (i == 0 && k == 0) {
                        break;
                    } else {
                        tk.append(email);
                        td.append(name);
                        tav.append(availableDays);
                    }
                }
                div.appendChild(tbl);
            })
        })
}
volunteerQuery();