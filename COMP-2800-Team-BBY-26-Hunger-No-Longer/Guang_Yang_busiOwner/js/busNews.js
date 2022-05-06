'use strict';
/* This FixedQueue function was copied from 
https://gist.github.com/bennadel/9760671 */

function FixedQueue(size, initialValues) {

    // If there are no initial arguments, default it to
    // an empty value so we can call the constructor in
    // a uniform way.
    initialValues = (initialValues || []);

    // Create the fixed queue array value.
    var queue = Array.apply(null, initialValues);

    // Store the fixed size in the queue.
    queue.fixedSize = size;

    // Add the class methods to the queue. Some of these have
    // to override the native Array methods in order to make
    // sure the queue lenght is maintained.
    queue.push = FixedQueue.push;
    queue.splice = FixedQueue.splice;
    queue.unshift = FixedQueue.unshift;

    // Trim any initial excess from the queue.
    FixedQueue.trimTail.call(queue);

    // Return the new queue.
    return (queue);

}


// I trim the queue down to the appropriate size, removing
// items from the beginning of the internal array.
FixedQueue.trimHead = function() {

    // Check to see if any trimming needs to be performed.
    if (this.length <= this.fixedSize) {

        // No trimming, return out.
        return;

    }

    // Trim whatever is beyond the fixed size.
    Array.prototype.splice.call(
        this,
        0,
        (this.length - this.fixedSize)
    );

};


// I trim the queue down to the appropriate size, removing
// items from the end of the internal array.
FixedQueue.trimTail = function() {

    // Check to see if any trimming needs to be performed.
    if (this.length <= this.fixedSize) {

        // No trimming, return out.
        return;

    }

    // Trim whatever is beyond the fixed size.
    Array.prototype.splice.call(
        this,
        this.fixedSize,
        (this.length - this.fixedSize)
    );

};


// I synthesize wrapper methods that call the native Array
// methods followed by a trimming method.
FixedQueue.wrapMethod = function(methodName, trimMethod) {

    // Create a wrapper that calls the given method.
    var wrapper = function() {

        // Get the native Array method.
        var method = Array.prototype[methodName];

        // Call the native method first.
        var result = method.apply(this, arguments);

        // Trim the queue now that it's been augmented.
        trimMethod.call(this);

        // Return the original value.
        return (result);

    };

    // Return the wrapper method.
    return (wrapper);

};


// Wrap the native methods.
FixedQueue.push = FixedQueue.wrapMethod(
    "push",
    FixedQueue.trimHead
);

FixedQueue.splice = FixedQueue.wrapMethod(
    "splice",
    FixedQueue.trimTail
);

FixedQueue.unshift = FixedQueue.wrapMethod(
    "unshift",
    FixedQueue.trimTail
);

// BusNews page will display maximum 10 news.
var newsfeedList = FixedQueue(10);
let count = 0;

$(document).ready(function() {

    // Read more function in each news content
    $(".read").click(function() {
        $(this).prev().toggle();
        if ($(this).text() == 'read more') {
            $(this).text('read less');
        } else {
            $(this).text('read more');
        }
    })
    $("#map").click(function() {
        console.log(222);
        window.location.href = './BusLocation.html';
    })

    // Users will go to BusNewsPost page after clicking on post news button in side bar
    $('#sidePostNews').click(() => {

        window.location.href = './BusNewsPost.html';
    })

    // Users will go to volunteer page after clicking on volunteer in side bar 
    $('#sideIndividual').click(() => {

        window.location.href = '../../individual.html';
    })

    // Users will go to Forum page after clicking on volunteer in side bar 
    $('#sideForum').click(() => {
        window.location.href = '../../Forum/Forum.html';
    })



    /**
     * Retrieve news data from database and store them in newsfeedList.
     */
    function getNews() {

        db.collection('BusinessNews')
            .get()
            .then((snap) => {
                snap.forEach((doc) => {
                    newsfeedList.unshift(doc.data()); // store news information into newsfeedlist array
                })
                renderNews();
            })
    }
    getNews();

    /**
     * Read business news information from firebase and display them in the BusNews page
     */

    function renderNews() {
        var i;
        var j;
        console.log(newsfeedList);
        for (i = 0; i < newsfeedList.length; i++) {

            $('#title' + i).text(newsfeedList[i].BusName); // Add news title
            $('#date' + i).text(newsfeedList[i].PostDate); // Add news post date

            /* Display two news item before read more buttons and the rest
             * will be shown after clicking on the read more button
             */
            for (j = 0; j < newsfeedList[i].Content.length; j++) {

                // First news item
                if (j == 0) {
                    $('#pic' + i).children('img').attr('src', `${newsfeedList[i].Image}`);
                    let li = document.createElement('li');
                    li.classList.add('firstLi')
                    $(li).text(newsfeedList[i].Content[j] + " Best used before " + newsfeedList[i].BestDate[j]);
                    $('#newsBody' + i).prepend(li);
                    console.log(i + " " + j + " " + newsfeedList[i].Content[j]);

                } else if (j == 1) {
                    $('#pic' + i).children('img').attr('src', `${newsfeedList[i].Image}`);
                    // Second news item
                    let li = document.createElement('li');
                    $('#newsBody' + i).children('li').after(li);
                    li.classList.add('dots');
                    $('#newsBody' + i).find('.dots').text(newsfeedList[i].Content[j] + " Best used before " + newsfeedList[i].BestDate[j]);

                    // create a span to store the rest news item inside it.
                    let span = document.createElement('span');
                    span.classList.add('more')
                    li.after(span);
                    console.log(i + " " + j + " " + newsfeedList[i].Content[j]);

                } else {
                    $('#pic' + i).children('img').attr('src', `${newsfeedList[i].Image}`);
                    // The rest news items are inside of span.
                    let li = document.createElement('li');
                    $(li).text(newsfeedList[i].Content[j] + " Best used before " + newsfeedList[i].BestDate[j]);
                    $('#newsBody' + i).find('.more').prepend(li);
                }
            }
        }
    }
})