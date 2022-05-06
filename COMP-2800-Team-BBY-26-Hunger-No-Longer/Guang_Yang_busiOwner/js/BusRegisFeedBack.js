$(document).ready(function() {

    // Back to home page after 5 seconds 
    var timer = 5;

    function countDown() {
        document.querySelector('.timer').innerHTML = 'Back to Home page after ' + timer + ' seconds';
        timer--
    }
    countDown();

    // timer
    setInterval(() => {
        if (timer == 0) {
            location.href = './BusNews.html';
        } else {
            document.querySelector('.timer').innerHTML = 'Back to Home page after ' + timer + ' seconds';
            timer--;
        }
    }, 1000)
})