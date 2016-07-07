$(document).ready(function(e) {
    // Initialise background slideshow
    /*$('#background').fancySlide({
        'fullscreen': true,
        'navigation': false,
        'captions': true,
        'nextBtnClass': '.next_btn',
        'prevBtnClass': '.prev_btn',
        'timer': 8000,
        'duration': 2000,
        'transition': 'horizontalBars',
        'opacity': 0.25,
        'colour': '#fffce9'
    });*/

    $('#background').backgrounds({
        'duration': 8000,
        'transition': 'fade'
    });

    // Store whether client panel is open or not
    var clientPanelOpen = false;

    // Store the client panel object
    var clientPanel = $('.js-client-panel');

    // Store any error message in the response div
    var clientError = clientPanel.find('#response h2');

    // Amount of pixels to be added if a error is displayed
    var extraPixels = 0;

    // Add listener to client panel header to open it on click
    clientPanel.find('h4').click(function(e) {
        // If there is an error message in the client panel
        if(clientError.length > 0) {
            extraPixels = 40;
            clientPanel.css({
                'margin-top': '-=40px'
            });
        }
        // If panel is open then close it
        if(clientPanelOpen) {
            clientPanel.animate({
                'margin-top': 205 + 'px'
            }, 400, 'easeOutBack');
            // Change header text
            $(this).html('Client VIP access');
            // Set to closed
            clientPanelOpen = false;
        } else {
            // If panel is closed open it
            clientPanel.animate({
                'margin-top': 90 - extraPixels + 'px'
            }, 400, 'easeOutBack');
            // Change header text
            $(this).html('Close');
            // Set to open
            clientPanelOpen = true;
        }
    });

    // Function sets up the text transition
    //setupTextChanger();
});

function setupTextChanger() {
    // Store the tagline h3
    var header = $('#tagline h3');
    // Array of words to be displayed
    var words = ['WIREFRAME & PROTOTYPING','MOTION GRAPHICS','USER INTERFACE DESIGN','MOBILE STRATEGY','ONLINE STRATEGY','INTERACTION DESIGN','USER EXPERIENCE','E-COMMERCE INTEGRATION', 'BRAND STRATEGY', 'USABILITY DESIGN', 'WEB & MOBILE DEVELOPMENT', 'VIDEO PRODUCTION & 3D', 'APPLICATION DEVELOPMENT', 'HOSTING & IT'];
    // Stores the index of which word is up
    var index = 1;

    // Fade out heading
    header.fadeOut(1000, function() {
        // Set text of heading
        header.html(words[index]);

        // Fade in the first element
        header.fadeIn(1000);

        // Interval is fired every X number of seconds
        var interval = setInterval(function() {
            // Increment the index
            index++;
            // If the end of the array is reached, go back to the start
            if(index == words.length) {
                index = 0;
            }
            // Fade out element and then create all the relevant elements
            header.fadeOut(1000, function() {
                // Set text of first element
                header.html(words[index]);

                // Fade in the first element
                header.fadeIn(1000);
            });
        }, 5000);
    });
}